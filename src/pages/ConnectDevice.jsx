import AdbClient from '../components/AdbClient.js';
import { GlobalContext } from '../components/GlobalContext';
import { useContext, useState } from 'react';
import Modal from '../components/Modal.jsx';
import { useNavigate } from 'react-router';
import Throbber from '../components/Throbber.jsx';

export default function ConnectDevice() {
    const context = useContext(GlobalContext);
    const { setDeviceClient, state } = context;
    const [connecting, setConnecting] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);

    return (
        <div class="bg-white dark:bg-slate-900" style={{ height: '100vh' }} id="content">
            <Modal opened={opened} setOpened={setOpened} title={title} closeAction={() => navigate('/')}>
                <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
            </Modal>
            <a className="absolute text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 ml-6 mt-8">Connect Device</a>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div class="mb-6">
                    <label for="ip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-lg">IP Address</label>
                    <input type="text" id="ip" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="192.168.1.2" required />
                </div>
                <button type="submit" class={`text-white text-center ${connecting ? 'bg-gray-800' : 'bg-blue-700 dark:bg-blue-600'} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800`} disabled={connecting} onClick={async () => {
                    setConnecting(true);
                    const ip = document.getElementById('ip').value + ':26101';
                    if (state.deviceClient) await state.deviceClient.disconnect();
                    const client = new AdbClient(ip, context);
                    try {
                        await client.connect();
                        setDeviceClient(client);
                        setConnecting(false);
                        setTitle('Connected');
                        setContent(`Successfully connected to your device! You can now manage your device.`);
                        setOpened(true);
                    } catch(e) {
                        setConnecting(false);
                        setTitle('Error');
                        setContent(`There was an error connecting to your device. Make sure the IP is correct, the device is on and make sure you've changed the Host PC IP in Developer Mode of the device to this device's IP.\nFull error: ${e}`);
                        setOpened(true);
                    }

                }}>
                    {connecting ? <Throbber /> : null}
                    Connect</button>
            </div>
        </div>
    )
}