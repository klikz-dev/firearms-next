import Container from '@/components/atoms/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from '@/components/atoms/Link'
import Logo from '@/components/molecules/Logo'
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import GradientBorder from '@/components/atoms/GradientBorder'
import Social from '@/components/molecules/Social'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import { useState } from 'react'
import { menu } from '@/const/setting/header'
import { Popover } from '@headlessui/react'
import Transition from '@/components/atoms/Transition'
import classNames from 'classnames'

export default function Header() {
  const [search, setSearch] = useState('')

  return (
    <header>
      <div className={'border-b shadow'}>
        <GradientBorder height={4} />

        <Container>
          <div
            className={'flex flex-row justify-between items-center gap-2 py-1'}
          >
            <Social />

            <Logo />

            <div className={'w-80 flex flex-row items-center'}>
              <Input
                placeholder='Search'
                className={'bg-zinc-200/60 rounded-full px-5 py-2'}
                value={search}
                setValue={setSearch}
              />
              <Button
                size='icon'
                className={'rounded-full bg-red-700 hover:bg-red-600 shrink-0'}
                href={search !== '' ? `/search?q=${search}` : undefined}
              >
                <FontAwesomeIcon icon={faSearch} className={'text-white'} />
              </Button>
            </div>
          </div>
        </Container>

        <Container>
          <div
            className={
              'flex flex-row justify-between items-center py-3 border-t'
            }
          >
            {menu?.map((menuItem, i1) => (
              <div key={i1}>
                {menuItem.path ? (
                  <Link
                    href={menuItem.path}
                    className={
                      'uppercase border-b border-white hover:border-red-700'
                    }
                  >
                    {menuItem.label}
                  </Link>
                ) : (
                  <Popover className='relative'>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            'group uppercase font-display inline-flex items-center gap-1 border-b border-white hover:border-red-700 ring-0 outline-none',
                            open && 'border-red-700'
                          )}
                        >
                          <span>{menuItem.label}</span>

                          <FontAwesomeIcon icon={faAngleDown} />
                        </Popover.Button>

                        <Transition>
                          <Popover.Panel
                            className={
                              'absolute z-50 w-56 px-3 py-5 bg-zinc-100 rounded shadow-xl border'
                            }
                          >
                            {menuItem.subMenus?.map((subMenu, i2) => (
                              <div key={i2} className={'block mb-3'}>
                                <Link
                                  href={subMenu.path}
                                  className={
                                    'uppercase border-b border-white hover:border-red-700'
                                  }
                                >
                                  {subMenu.label}
                                </Link>
                              </div>
                            ))}
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </header>
  )
}
