import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
    MapPin,
    Camera,
    Mic,
    CheckCircle,
    Loader,
    Navigation,
    Trash2,
    Droplets,
    Cloud,
    Zap,
    Bus,
    MoreHorizontal,
    ChevronRight,
    ChevronLeft,
    AlertTriangle,
    EyeOff,
    Eye,
    Thermometer,
    FileText,
    ListFilter
} from 'lucide-react';
import toast from 'react-hot-toast';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationData {
    latitude: number;
    longitude: number;
    accuracy: number;
    address?: string;
}

// Component to update map center
function ChangeMapView({ center }: { center: [number, number] }) {
    const map = useMap();
    map.setView(center, 15);
    return null;
}

const CATEGORIES = [
    {
        id: 'waste',
        name: 'Waste & Garbage',
        icon: Trash2,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        subCategories: [
            { id: 'garbage_pile', label: 'Garbage Pile' },
            { id: 'dustbin_overflow', label: 'Dustbin Overflow' },
            { id: 'dead_animal', label: 'Dead Animal' },
            { id: 'construction_debris', label: 'Construction Debris' },
            { id: 'burning', label: 'Garbage Burning' }
        ]
    },
    {
        id: 'water',
        name: 'Water & Sewage',
        icon: Droplets,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        subCategories: [
            { id: 'leakage', label: 'Pipeline Leakage' },
            { id: 'no_supply', label: 'No Water Supply' },
            { id: 'dirty_water', label: 'Contaminated Water' },
            { id: 'sewer_blockage', label: 'Sewer Blockage/Overflow' }
        ]
    },
    {
        id: 'air',
        name: 'Air Pollution',
        icon: Cloud,
        color: 'text-gray-600',
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        subCategories: [
            { id: 'construction_dust', label: 'Construction Dust' },
            { id: 'industrial_smoke', label: 'Industrial Smoke' },
            { id: 'vehicle_pollution', label: 'Visible Vehicle Emission' },
            { id: 'crop_burning', label: 'Crop Residue Burning' }
        ]
    },
    {
        id: 'power',
        name: 'Electricity',
        icon: Zap,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        subCategories: [
            { id: 'power_cut', label: 'Power Failure' },
            { id: 'street_light', label: 'Street Light Not Working' },
            { id: 'hanging_wires', label: 'Dangerous Hanging Wires' },
            { id: 'transformer', label: 'Transformer Issues' }
        ]
    },
    {
        id: 'transport',
        name: 'Roads & Traffic',
        icon: Bus,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        subCategories: [
            { id: 'pothole', label: 'Pothole / Broken Road' },
            { id: 'footpath', label: 'Broken Footpath' },
            { id: 'traffic_signal', label: 'Traffic Signal Fault' },
            { id: 'encroachment', label: 'Illegal Encroachment' }
        ]
    },
    {
        id: 'other',
        name: 'Other Issue',
        icon: MoreHorizontal,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        subCategories: [
            { id: 'noise', label: 'Noise Pollution' },
            { id: 'park', label: 'Park Maintenance' },
            { id: 'stray_dog', label: 'Stray Dog Menace' },
            { id: 'other', label: 'Something Else' }
        ]
    },
];

const SEVERITY_LEVELS = [
    { id: 'low', label: 'Low', color: 'bg-blue-500' },
    { id: 'medium', label: 'Medium', color: 'bg-orange-500' },
    { id: 'high', label: 'High', color: 'bg-red-500' },
    { id: 'critical', label: 'Critical', color: 'bg-red-700' },
];

const ReportPage = () => {
    // Form State
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        category: '',
        subCategory: '', // NEW
        description: '',
        severity: 'medium',
        isAnonymous: false,
        images: [] as string[],
    });

    // Location State
    const [location, setLocation] = useState<LocationData | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState<[number, number]>([28.6139, 77.2090]);

    // UI State
    const [isRecording, setIsRecording] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAIAnalysis, setShowAIAnalysis] = useState(false);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = () => {
        setLocationLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const loc: LocationData = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    setMapCenter([loc.latitude, loc.longitude]);

                    try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.latitude}&lon=${loc.longitude}`);
                        const data = await res.json();
                        loc.address = data.display_name || `${loc.latitude}, ${loc.longitude}`;
                    } catch (e) {
                        loc.address = `${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}`;
                    }

                    setLocation(loc);
                    setLocationLoading(false);
                },
                () => {
                    setLocationLoading(false);
                    toast.error('Could not fetch location');
                },
                { enableHighAccuracy: true }
            );
        }
    };

    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            toast.error('Voice input not supported in this browser');
            return;
        }

        setIsRecording(true);
        setTimeout(() => {
            setIsRecording(false);
            setFormData(prev => ({ ...prev, description: prev.description + " There is a large pile of garbage blocking the road near the main market." }));
            toast.success("Voice transcribed successfully");
            setShowAIAnalysis(true);
        }, 2000);
    };

    const nextStep = () => {
        if (currentStep === 1 && !formData.category) return toast.error('Please select a category');
        if (currentStep === 2 && !formData.subCategory) return toast.error('Please select a specific issue'); // Validation
        if (currentStep === 3 && !location) return toast.error('Location is required');
        if (currentStep === 4 && !formData.description) return toast.error('Please describe the issue');
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setReferenceNumber(`DL-CIV-${Math.floor(Math.random() * 100000)}`);
        setIsSubmitting(false);
        setCurrentStep(6); // Success step (now 6)
    };

    const renderStepIndicator = () => (
        <div className="flex justify-between items-center mb-6 px-2">
            {[1, 2, 3, 4, 5].map(step => (
                <div key={step} className="flex flex-col items-center relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step === currentStep ? 'bg-primary-600 text-white shadow-lg scale-110' :
                            step < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                        }`}>
                        {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                    </div>
                    <span className="text-[10px] font-medium mt-1 text-gray-500 absolute -bottom-5 w-20 text-center">
                        {step === 1 ? 'Category' : step === 2 ? 'Type' : step === 3 ? 'Location' : step === 4 ? 'Details' : 'Review'}
                    </span>
                </div>
            ))}
            <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 -z-0 rounded-full" />
            <div
                className="absolute top-4 left-0 h-1 bg-primary-500 -z-0 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />
        </div>
    );

    return (
        <Layout>
            <div className="max-w-2xl mx-auto px-4 pb-20 pt-2">
                {currentStep < 6 && renderStepIndicator()}

                <AnimatePresence mode="wait">
                    {/* STEP 1: CATEGORY */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4 mt-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">What type of issue is it?</h2>
                            <p className="text-gray-500 text-sm mb-4">Select the category that best describes the problem.</p>

                            <div className="grid grid-cols-2 gap-4">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setFormData(prev => ({ ...prev, category: cat.id, subCategory: '' }));
                                            // Auto advance is nice but maybe wait for click
                                        }}
                                        onDoubleClick={() => nextStep()}
                                        className={`p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 text-center ${formData.category === cat.id
                                                ? `${cat.border} ${cat.bg} ring-2 ring-primary-500 ring-offset-2`
                                                : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-full bg-white shadow-sm ${cat.color}`}>
                                            <cat.icon className="w-6 h-6" />
                                        </div>
                                        <span className={`font-semibold text-sm ${formData.category === cat.id ? 'text-gray-900' : 'text-gray-600'}`}>
                                            {cat.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: SUB-CATEGORY (NEW) */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4 mt-8"
                        >
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Be specific</h2>
                                <p className="text-gray-500 text-sm">What exactly is wrong?</p>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                {CATEGORIES.find(c => c.id === formData.category)?.subCategories.map((sub, idx) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => setFormData(prev => ({ ...prev, subCategory: sub.id }))}
                                        className={`w-full text-left p-5 flex items-center justify-between transition-colors border-b border-gray-50 last:border-0 ${formData.subCategory === sub.id ? 'bg-primary-50' : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className={`font-medium ${formData.subCategory === sub.id ? 'text-primary-700' : 'text-gray-700'}`}>
                                            {sub.label}
                                        </span>
                                        {formData.subCategory === sub.id && <CheckCircle className="w-5 h-5 text-primary-600" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: LOCATION */}
                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4 mt-8"
                        >
                            <div className="flex justify-between items-end">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Where is it?</h2>
                                    <p className="text-gray-500 text-sm">Pinpoint the exact location.</p>
                                </div>
                                <button
                                    onClick={getCurrentLocation}
                                    className="text-primary-600 text-sm font-semibold flex items-center gap-1 hover:bg-primary-50 px-3 py-1 rounded-lg transition-colors"
                                >
                                    <Navigation className="w-4 h-4" /> Locate Me
                                </button>
                            </div>

                            <div className="h-80 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 relative group">
                                <MapContainer center={mapCenter} zoom={15} className="h-full w-full">
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    {location && (
                                        <>
                                            <Marker position={[location.latitude, location.longitude]}>
                                                <Popup>You are here</Popup>
                                            </Marker>
                                            <ChangeMapView center={[location.latitude, location.longitude]} />
                                        </>
                                    )}
                                </MapContainer>
                                {locationLoading && (
                                    <div className="absolute inset-0 bg-white/80 z-[1000] flex items-center justify-center backdrop-blur-sm">
                                        <Loader className="w-8 h-8 text-primary-600 animate-spin" />
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl flex items-start gap-3 border border-gray-200">
                                <MapPin className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Detected Address</p>
                                    <p className="text-sm font-medium text-gray-900">{location?.address || 'Searching...'}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: DETAILS */}
                    {currentStep === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6 mt-8"
                        >
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Details & Evidence</h2>
                                <p className="text-gray-500 text-sm">Help us understand the severity.</p>
                            </div>

                            <div className="space-y-4">
                                {/* Description */}
                                <div className="relative">
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe the issue in detail..."
                                        className="w-full h-32 p-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none resize-none text-base"
                                    />
                                    <button
                                        onClick={handleVoiceInput}
                                        className={`absolute bottom-4 right-4 p-2 rounded-full shadow-md transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-primary-100 text-primary-600 hover:bg-primary-200'}`}
                                    >
                                        <Mic className="w-5 h-5" />
                                    </button>
                                </div>

                                {showAIAnalysis && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="bg-purple-50 p-3 rounded-lg border border-purple-100 flex items-start gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4 text-purple-600 mt-1" />
                                        <div>
                                            <p className="text-xs font-bold text-purple-700">AI Analysis</p>
                                            <p className="text-xs text-purple-600">Seems like a <strong>High Priority</strong> issue.</p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Severity Slider */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <Thermometer className="w-4 h-4" /> Severity Level
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {SEVERITY_LEVELS.map(level => (
                                            <button
                                                key={level.id}
                                                onClick={() => setFormData({ ...formData, severity: level.id })}
                                                className={`py-2 rounded-lg text-xs font-bold transition-all ${formData.severity === level.id
                                                        ? `${level.color} text-white shadow-md scale-105`
                                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {level.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Evidence */}
                                <div className="flex gap-3">
                                    <button className="flex-1 py-4 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-primary-500 hover:bg-primary-50 transition-colors">
                                        <Camera className="w-6 h-6" />
                                        <span className="text-xs font-medium">Take Photo</span>
                                    </button>
                                    <button className="flex-1 text-xs font-semibold py-4 border-2 border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:bg-gray-50">
                                        + Upload
                                    </button>
                                </div>

                                {/* Anonymous Toggle */}
                                <div
                                    onClick={() => setFormData({ ...formData, isAnonymous: !formData.isAnonymous })}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer border border-transparent hover:border-gray-200 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${formData.isAnonymous ? 'bg-gray-800 text-white' : 'bg-white text-gray-400'}`}>
                                            {formData.isAnonymous ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">Anonymous Reporting</p>
                                            <p className="text-xs text-gray-500">Hide my identity from public logs</p>
                                        </div>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.isAnonymous ? 'bg-gray-800' : 'bg-gray-300'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.isAnonymous ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 5: REVIEW */}
                    {currentStep === 5 && (
                        <motion.div
                            key="step5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6 mt-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">Review Report</h2>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="h-2 bg-primary-500" />
                                <div className="p-6 space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Category</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {CATEGORIES.find(c => c.id === formData.category)?.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {CATEGORIES.find(c => c.id === formData.category)?.subCategories.find(s => s.id === formData.subCategory)?.label}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Severity</p>
                                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold text-white mt-1 capitalize ${SEVERITY_LEVELS.find(s => s.id === formData.severity)?.color}`}>
                                                {formData.severity}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Location</p>
                                            <p className="text-sm text-gray-800 mt-1 leading-relaxed">{location?.address}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Description</p>
                                        <p className="text-sm text-gray-700 italic">"{formData.description}"</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 6: SUCCESS */}
                    {currentStep === 6 && (
                        <motion.div
                            key="step6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center pt-10"
                        >
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-green-200 shadow-xl">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Report Submitted!</h2>
                            <p className="text-gray-500 mb-8 max-w-xs mx-auto">Thank you for being a responsible citizen. Your contribution helps make Delhi cleaner.</p>

                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8 transform rotate-1">
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Ticket Reference</p>
                                <p className="text-3xl font-mono font-bold text-primary-600 tracking-wider">{referenceNumber}</p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setFormData({ category: '', subCategory: '', description: '', severity: 'medium', isAnonymous: false, images: [] });
                                        setCurrentStep(1);
                                    }}
                                    className="flex-1 py-4 rounded-xl bg-gray-100 font-bold text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => window.location.href = '/my-complaints'}
                                    className="flex-1 py-4 rounded-xl bg-primary-600 font-bold text-white hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all hover:scale-105"
                                >
                                    Track Status
                                </button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>

                {/* NAVIGATION BUTTONS */}
                {currentStep < 6 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 pb-8 md:pb-4 z-50 px-6"
                    >
                        <div className="max-w-2xl mx-auto flex gap-4">
                            {currentStep > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-4 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                            )}
                            <button
                                onClick={currentStep === 5 ? handleSubmit : nextStep}
                                disabled={isSubmitting}
                                className={`flex-1 py-4 rounded-xl bg-primary-600 text-white font-bold text-lg shadow-xl shadow-primary-200 hover:bg-primary-700 active:scale-95 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-80' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader className="w-6 h-6 animate-spin" /> Submitting...
                                    </>
                                ) : (
                                    <>
                                        {currentStep === 5 ? 'Confirm & Submit' : 'Next Step'}
                                        {currentStep !== 5 && <ChevronRight className="w-6 h-6" />}
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};

export default ReportPage;
