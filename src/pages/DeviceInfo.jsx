import { useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import { useNavigate } from "react-router";
export default function DeviceInfo() {
    const { state } = useContext(GlobalContext);
    const navigate = useNavigate();

    if (!state.deviceClient) {
        navigate('/');
        return null;
    }

    return (
        <div className="bg-white dark:bg-slate-900 absolute overflow-y-auto" style={{ height: '100vh' }} id="content">
            <div className="p-4">
                <a className="absolute text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 ml-6 mt-8 sm:text-3xl">Device Info</a>
                <div className="mt-[6rem]">
                    <h2 className="text-4xl font-semibold text-gray-900 dark:text-white sm:text-2xl">System Info</h2>
                    <div className="mt-4" style={{ height: '20vh', overflowY: 'auto' }}>
                        {state.deviceInfo.map((info, idx) => (
                            <div key={idx} className="w-full p-4">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{info.split(':')[0]}</h3>
                                    <p className="text-gray-500 dark:text-gray-400">{info.split(':')[1]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="text-4xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Capabilities</h2>
                    <div className="flex flex-wrap overflow-y-auto mt-4" style={{ height: '54vh' }}>
                        {Object.keys(state.deviceCapabilities).map((cap, idx) => (
                            <div key={idx} className="w-full p-4">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cap}</h3>
                                    <p className="text-gray-500 dark:text-gray-400">{state.deviceCapabilities[cap]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}