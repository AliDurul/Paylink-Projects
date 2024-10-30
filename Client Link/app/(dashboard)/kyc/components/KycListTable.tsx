'use client'
import Link from 'next/link';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { selectIsDarkMode } from '@/lib/features/themeConfig/themeConfigSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { DeleteIcon, EditIcon, PreviewIcon, PrintIcon } from '@/app/icons';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import useDeleteToasts from '@/hooks/useDeleteToasts';
import { fetchAllKycAsync, selectKycState, selectKycs, selectValue, updateKycState, updateKycs } from '@/lib/features/kyc/kycSlice';
import { deleteKyc, deleteMultiKyc } from '@/lib/features/kyc/kycAPI';
import { coloredToast } from '@/utils/sweetAlerts';
import Image from 'next/image';
import { formatDate } from '@/utils/helperFunctions';
import { useRouter } from 'next/navigation';
import { Kyc } from '@/types/types';


const KycListTable = () => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { deleteToast, multiDeleteToast } = useDeleteToasts();
    const kycs = useAppSelector(selectKycs);
    const isDark = useAppSelector(selectIsDarkMode);
    const value = useAppSelector(selectValue);


    useEffect(() => {
        dispatch(fetchAllKycAsync({ type: 'Customer' }));
    }, []);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(kycs.results, 'first_name'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [date3, setDate3] = useState<any>(null);
    const [activeFilter, setActiveFilter] = useState<any>(false);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'first_name',
        direction: 'asc',
    });


    useEffect(() => {
        setRecords(kycs.results);
        setInitialRecords(kycs.results);
    }, [kycs]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...(Array.isArray(initialRecords) ? initialRecords.slice(from, to) : [])]);
    }, [page, pageSize, initialRecords]);


    useEffect(() => {
        const [startDate, endDate] = date3 ? date3.map((date: string | number | Date) => new Date(date)) : [null, null];
        setInitialRecords(() => {
            return kycs.results?.filter((kyc: Kyc) => {
                const itemDate = new Date(kyc.date_joined);
                const isInDateRange = startDate && endDate ? (itemDate >= startDate && itemDate <= endDate) : true;
                const matchesSearch = (
                    kyc.first_name.toLowerCase().includes(search.toLowerCase()) ||
                    kyc.last_name.toLowerCase().includes(search.toLowerCase()) ||
                    kyc.email.toLowerCase().includes(search.toLowerCase()) ||
                    kyc.location.toLowerCase().includes(search.toLowerCase()) ||
                    kyc.phone_number.toLowerCase().includes(search.toLowerCase())
                );
                return isInDateRange && matchesSearch;

            });
        });
    }, [search, activeFilter]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    const deleteRow = async (id: any = null) => {
        if (id) {
            const deletionSuccess = await deleteToast(id, deleteKyc, updateKycs);
            if (deletionSuccess) {
                setSelectedRecords([]);
                setSearch("");
            }
        } else {
            let selectedRows = selectedRecords || [];
            if (selectedRows?.length === 0) {
                coloredToast("warning", "Select items to delete!");
                return;
            }
            const ids = selectedRows?.map((d: any) => { return d.id; });
            const deletionSuccess = await multiDeleteToast(ids, deleteMultiKyc, updateKycs);
            if (deletionSuccess) {
                setSelectedRecords([]);
                setSearch("");
                setPage(1);
            }
        }
    };

    return (
        <>
            {
                value === 'list' && <div className="panel mt-5 border-white-light px-0 dark:border-[#1b2e4b]">
                    <div className="invoice-table">
                        <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                            <div className="flex flex-wrap items-center justify-around gap-2 pl-3">
                                {selectedRecords.length >= 1 && <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                                    <DeleteIcon />
                                    Delete
                                </button>}
                                {/* <TicketModal ticketModal={ticketModal} setTicketModal={setTicketModal} /> */}
                            </div>
                            <div className='flex justify-center items-center gap-4'>
                                <Flatpickr
                                    options={{
                                        mode: 'range',
                                        dateFormat: 'd-m-Y',
                                        position: 'auto right',
                                        onClose: (selectedDates, dateStr, instance) => {
                                            setDate3(selectedDates); // Assuming setDate3 is your state updater function
                                            setActiveFilter(!activeFilter)
                                        },

                                    }}
                                    // defaultValue={''}
                                    placeholder="Please select a date range..."
                                    className="form-input w-60"
                                    onChange={(date3: any) => setDate3(date3)}
                                />
                                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />

                            </div>

                        </div>
                        <div className="pl-1 datatables pagination-padding">
                            <DataTable
                                className={`${isDark} table-hover whitespace-nowrap`}
                                records={records?.map((kyc, index) => ({
                                    ...kyc,
                                    serialNumber: index + 1,
                                }))}
                                columns={[
                                    {
                                        accessor: 'id',
                                        sortable: true,
                                        render: ({ serialNumber }) => (
                                            <Link href="/apps/invoice/preview">
                                                <div className="font-semibold text-primary underline hover:no-underline">{`#${serialNumber}`}</div>
                                            </Link>
                                        ),
                                    },
                                    {
                                        accessor: 'name',
                                        // sortable: true,
                                        render: ({ first_name, last_name, id }) => (
                                            <div className="flex items-center font-semibold">
                                                <div className="w-max rounded-full bg-white-dark/30 p-0.5 ltr:mr-2 rtl:ml-2">
                                                    <Image height={32} width={32} className="h-8 w-8 rounded-full object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" />
                                                </div>
                                                <div>{first_name} {last_name}</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: 'email',
                                        // sortable: true,
                                    },
                                    {
                                        accessor: 'location',
                                        // sortable: true,
                                    },
                                    {
                                        accessor: 'date_joined',
                                        // sortable: true,
                                        render: ({ date_joined }) => <span >{formatDate(date_joined)}</span>
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Actions',
                                        sortable: false,
                                        textAlignment: 'center',
                                        render: (kyc) => (
                                            <div className="mx-auto flex w-max items-center gap-4">
                                                <button
                                                    onClick={() => { router.push(`/kyc/action?s=e&userId=${kyc.id}`), dispatch(updateKycState(kyc)) }}
                                                    className="flex hover:text-info"
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button
                                                    className="flex hover:text-primary"
                                                    onClick={() => { router.push(`/kyc/action?s=r&userId=${kyc.id}`), dispatch(updateKycState(kyc)) }}
                                                >
                                                    <PreviewIcon />
                                                </button>
                                                <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(kyc.id)}>
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                highlightOnHover
                                totalRecords={initialRecords.length}
                                recordsPerPage={pageSize}
                                page={page}
                                onPageChange={(p) => setPage(p)}
                                recordsPerPageOptions={PAGE_SIZES}
                                onRecordsPerPageChange={setPageSize}
                                sortStatus={sortStatus}
                                onSortStatusChange={setSortStatus}
                                selectedRecords={selectedRecords}
                                onSelectedRecordsChange={setSelectedRecords}
                                paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                            />
                        </div>
                    </div>
                </div>
            }
        </>

    );
};

export default KycListTable;
