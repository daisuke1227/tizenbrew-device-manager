import { InformationCircleIcon, PlusIcon, TvIcon, XMarkIcon, HomeIcon } from '@heroicons/react/24/outline'
import { GlobalContext } from './GlobalContext';
import { Link } from 'react-router';
import { useContext } from 'react';

import TizenBrewLogo from '../assets/tizenbrew.svg'
const navigation = [
    {
        name: 'Home',
        icon: HomeIcon,
        shouldDisable: false,
        to: '/'
    },
    {
        name: 'Apps',
        icon: TvIcon,
        shouldDisable: true,
        to: '/apps'
    },
    {
        name: 'Device Info',
        icon: InformationCircleIcon,
        shouldDisable: true,
        to: '/info'
    },
    {
        name: 'Connect Device',
        icon: PlusIcon,
        shouldDisable: false,
        to: '/add'
    }
]

export default function Navigation({ opened, setOpened }) {
    const { state } = useContext(GlobalContext);

    if (window.innerWidth > 1024) {
        setOpened(true)
    }
    return (
        <div id="drawer-navigation" className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 ${!opened ? '-translate-x-full' : ''}`} tabIndex="-1" aria-labelledby="drawer-navigation-label">
            <img src={TizenBrewLogo} className="w-48"/>
            <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white lg:hidden" onClick={() => setOpened(false)}>
                <XMarkIcon width={'1.5rem'}/> 
                <span className="sr-only">Close menu</span>
            </button>
            <div className="py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    {navigation.map((item) => (
                        <li key={item.name}>
                        <Link to={item.to} className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${!state.deviceClient && item.shouldDisable ? 'pointer-events-none opacity-50' : ''}`}>
                            <item.icon className="w-6"/>
                            <span className="ms-3">{item.name}</span>
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}