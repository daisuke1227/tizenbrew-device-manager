import { Bars3Icon } from '@heroicons/react/24/solid';

export default function MobileNavBar({ setOpened }) {
    return (
        <div class="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 shadow dark:shadow-none" id="mobile-navbar">
            <nav class="flex justify-between items-center p-4">
                {/* Add hamburger icon only */}
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setOpened(true)}>
                    <Bars3Icon width={'1.5rem'}/>
                    <span class="sr-only">Open menu</span>
                </button>
            </nav>
        </div>
    )
}