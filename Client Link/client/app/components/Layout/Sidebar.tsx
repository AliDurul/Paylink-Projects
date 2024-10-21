'use client'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { ContactIcon, DoubleArrowIcon, FaqIcon, InvoiceIcon, MailBox, NotesIcon, ProductIcon, TicketIcon, TodoIcon } from '@/app/icons'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectThemeConfig, toggleSidebar } from '@/lib/features/themeConfig/themeConfigSlice';
import AnimateHeight from 'react-animate-height';



const Sidebar = () => {
    const pathname: string = usePathname()
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useAppSelector(selectThemeConfig)
    const semidark = themeConfig.semidark
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const dispatch = useAppDispatch();

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    {/* Sidebar Header*/}
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="flex shrink-0 items-center">
                            <Image className="flex-none" src="/assets/images/onelife-logo.png" alt="logo" width={150} height={50} />
                            {/* <span className=" px-1 align-middle text-base font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">United Bank for Africa</span> */}
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <DoubleArrowIcon />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 ">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light ">Dashboard</span>
                                    </div>

                                    <div className={currentMenu === 'dashboard' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/">Owerview</Link>
                                        </li>
                                        <li>
                                            <Link href="/analytics">Analytics</Link>
                                        </li>
                                        <li>
                                            <Link href="/finance">Finance</Link>
                                        </li>
                                        {/* <li>
                                            <Link href="/crypto">crypto</Link>
                                        </li> */}
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <svg className="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>Modules</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    {/* <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('invoice')}>
                                            <div className="flex items-center">
                                                <InvoiceIcon />
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light">Invoice</span>
                                            </div>

                                            <div className={currentMenu === 'invoice' ? '!rotate-90' : 'rtl:rotate-180'}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link href="/invoice">list</Link>
                                                </li>
                                                <li>
                                                    <Link href="/invoice/preview">preview</Link>
                                                </li>
                                                <li>
                                                    <Link href="/invoice/action">add</Link>
                                                </li>
                                                <li>
                                                    <Link href="/invoice/edit">edit</Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li> */}
                                    {/* <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'ticket' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('ticket')}>
                                            <div className="flex items-center">
                                                <svg width="24" height="24" className="group-hover:!text-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17 12C19.7614 12 22 9.76142 22 7C22 4.23858 19.7614 2 17 2C14.2386 2 12 4.23858 12 7C12 7.79984 12.1878 8.55582 12.5217 9.22624C12.6105 9.4044 12.64 9.60803 12.5886 9.80031L12.2908 10.9133C12.1615 11.3965 12.6035 11.8385 13.0867 11.7092L14.1997 11.4114C14.392 11.36 14.5956 11.3895 14.7738 11.4783C15.4442 11.8122 16.2002 12 17 12Z" fill="currentColor" />
                                                    <path opacity="0.5" d="M8.03759 7.31617L8.6866 8.4791C9.2723 9.52858 9.03718 10.9053 8.11471 11.8278C8.11471 11.8278 8.11471 11.8278 8.11471 11.8278C8.11459 11.8279 6.99588 12.9468 9.02451 14.9755C11.0525 17.0035 12.1714 15.8861 12.1722 15.8853C12.1722 15.8853 12.1722 15.8853 12.1722 15.8853C13.0947 14.9628 14.4714 14.7277 15.5209 15.3134L16.6838 15.9624C18.2686 16.8468 18.4557 19.0692 17.0628 20.4622C16.2258 21.2992 15.2004 21.9505 14.0669 21.9934C12.1588 22.0658 8.91828 21.5829 5.6677 18.3323C2.41713 15.0817 1.93421 11.8412 2.00655 9.93309C2.04952 8.7996 2.7008 7.77423 3.53781 6.93723C4.93076 5.54428 7.15317 5.73144 8.03759 7.31617Z" fill="currentColor" />
                                                </svg>

                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light">Ticket</span>
                                            </div>

                                            <div className={currentMenu === 'ticket' ? '!rotate-90' : 'rtl:rotate-180'}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'ticket' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link href="/ticket">list</Link>
                                                </li>
                                                <li>
                                                    <Link href="/ticket/preview">preview</Link>
                                                </li>
                                                <li>
                                                    <Link href="/ticket/add">add</Link>
                                                </li>
                                                <li>
                                                    <Link href="/ticket/edit">edit</Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link href="/invoice" className="group">
                                            <div className="flex items-center">
                                                <InvoiceIcon />
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light">Invoices</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'social-media' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('social-media')}>
                                            <div className="flex items-center">
                                                <MailBox />
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light ">Inbox</span>
                                            </div>

                                            <div className={currentMenu === 'social-media' ? 'rotate-90' : 'rtl:rotate-180'}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'social-media' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link href="/mailbox">Emails</Link>
                                                </li>
                                                <li>
                                                    <Link href="/wp">Whatsapp</Link>
                                                </li>
                                                <li>
                                                    <Link href="/facebook">Facebook</Link>
                                                </li>
                                                <li>
                                                    <Link href="/instagram">Instagram</Link>
                                                </li>

                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/ticket" className="group">
                                            <div className="flex items-center">
                                                <TicketIcon />
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light">Tickets</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/kyc" className="group">
                                            <div className="flex items-center">
                                                <ContactIcon />
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light">KYC</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/product" className="group">
                                            <div className="flex items-center">
                                                <ProductIcon />
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light">Products</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/voice-records" className="group">
                                            <div className="flex items-center">
                                                <ProductIcon />
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light">Voice Records</span>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <svg className="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>Apps</span>
                            </h2>
                            <li className="nav-item">
                                <Link href="/tasks" className="group">
                                    <div className="flex items-center">
                                        <TodoIcon />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light">Task List</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/notes" className="group">
                                    <div className="flex items-center">
                                        <NotesIcon />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light">Notes</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/faq" className="group">
                                    <div className="flex items-center">
                                        <FaqIcon />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light">FAQ</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
