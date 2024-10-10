'use client'
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Chat } from '@/types/types';
import { formatDate } from '@/utils/helperFunctions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useParams } from 'next/navigation';
import GroupModal from './GroupModal';
import { useAppSelector } from '@/lib/hooks';
import { selectActiveUsers } from '@/lib/features/kyc/kycSlice';

interface ChatListProps {
    filteredItems: Chat[];
    selectUser: (chat: any) => void;
    selectedTab?: string
}

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const ChatList = ({ selectUser, filteredItems, selectedTab }: ChatListProps) => {

    const { userInfo } = useCurrentUser()
    const navigate = useRouter()
    const params = useParams();

    const activeUsers = useAppSelector(selectActiveUsers)
    const [groupModal, setGroupModal] = useState(false);


    return (
        <PerfectScrollbar className="chat-users relative -mr-3.5 h-full min-h-[100px] space-y-0.5 pb-5 pr-3.5 sm:h-[calc(100vh_-_357px)]">
            {
                filteredItems?.length === 0 ? (
                    <div className=" relative flex items-center justify-center h-full">
                        <p className="text-gray-400 dark:text-gray-500">No Chat found</p>
                    </div>
                ) : (
                    <>
                        {filteredItems.map((chat: Chat, i: number) => {
                            const member = chat.chatUsers.find((member: any) => member.id !== userInfo?.user_id);
                            return (
                                <button
                                    onClick={() => { selectUser(chat); navigate.push(`/chats/${chat.id}`) }}
                                    className={`flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b14] dark:hover:text-primary ${params?.chatId && Number(params?.chatId) === chat.id ? 'bg-gray-100 text-primary dark:bg-[#050b14] dark:text-primary' : ''}`}
                                    key={chat.id}
                                    type="button"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <div className="relative flex-shrink-0">
                                                <Image
                                                    className="rounded-full object-cover"
                                                    width={48}
                                                    height={48}
                                                    src={`${chat.isGroupChat ? `${BASE_URL}/image/${chat.chatPicture}` : `${BASE_URL}/image/${member?.profilePic || '/assets/images/profile.png'}`}`} alt=""
                                                />
                                                {
                                                    !chat.isGroupChat && activeUsers.some(user => user.userId === member?.id) && (
                                                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                                            <div className="size-3 rounded-full bg-success"></div>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                            <div className="mx-3 ltr:text-left rtl:text-right">
                                                {
                                                    chat.isGroupChat
                                                        ? <p className="mb-1 font-semibold">{chat.chatName}</p>
                                                        : <p className="mb-1 font-semibold">{member?.firstName} {member?.lastName}</p>

                                                }
                                                <p className="max-w-[185px] truncate text-xs text-white-dark">{chat.latestMessage?.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="whitespace-nowrap text-xs ">
                                        <p>{chat.latestMessage && formatDate(chat?.latestMessage.createdAt)}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </>

                )
            }
            {selectedTab === 'Groups' && <button className='btn btn-primary btn-md absolute bottom-10 right-5' onClick={() => setGroupModal(!groupModal)}>+</button>}
            <GroupModal isOpen={groupModal} onClose={() => setGroupModal(false)} />
        </PerfectScrollbar >
    )
}

export default ChatList