'use client'

import { DisclosureButton, MenuItem } from "@headlessui/react"
import { signOut } from "next-auth/react"

export const SignOutBtn = ({ isSmalScreen }: { isSmalScreen: boolean }) => {
  return (
    <>
      {
        isSmalScreen ? (<DisclosureButton
          as="a"
          href="#"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => signOut()}
        >
          Sign out
        </DisclosureButton>) : (
          <MenuItem >
            <button className="block px-4 py-2 text-sm text-white data-[focus]:text-gray-300" onClick={() => signOut()}>
              Sign out
            </button>
          </MenuItem>
        )
      }

    </>
  )
}
