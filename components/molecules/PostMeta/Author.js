import HTMLContent from '@/components/atoms/HTMLContent'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import {
  faCheckCircle,
  faPenToSquare,
} from '@fortawesome/free-regular-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, Transition } from '@headlessui/react'
import { useState } from 'react'

export default function Author({ author, headline = 'Written By' }) {
  console.log(author)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover className='relative'>
      <div
        onClick={() => setIsOpen(!isOpen)}
        role='button'
        aria-expanded={isOpen}
      >
        <div className={'flex flex-row items-center gap-2'}>
          <div
            className={'rounded-full p-0.5'}
            style={{
              background:
                'linear-gradient(90deg, #dc2626 0%, #dc2626 50%, #ffffff 50%, #ffffff 100%)',
            }}
          >
            <div className={'p-0.5 bg-white rounded-full'}>
              <div
                className={'relative w-12 h-12 overflow-hidden rounded-full'}
              >
                <Image
                  src={author?.avatar?.url}
                  width={48}
                  height={48}
                  alt={author?.name}
                  className={'object-cover'}
                />
              </div>
            </div>
          </div>

          <div>
            <p className={'text-sm'}>{headline}</p>
            <h5>{author?.name}</h5>
            <p className={'text-sm underline'}>{author?.author?.position}</p>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
        className={
          'fixed top-0 left-0 bottom-0 right-0 bg-zinc-700/30 z-50 flex justify-center items-center'
        }
      >
        <Popover.Panel
          className='relative bg-white rounded-lg shadow-lg max-w-3xl'
          static
        >
          <div
            className={
              'absolute right-4 top-2 rounded-full border w-6 h-6 flex justify-center items-center cursor-pointer hover:bg-zinc-800 group'
            }
          >
            <FontAwesomeIcon
              icon={faX}
              onClick={() => setIsOpen(false)}
              className={'text-zinc-800 group-hover:text-white'}
            />
          </div>

          <div className={'grid grid-cols-4 gap-4 px-8 py-4'}>
            <div
              className={
                'col-span-1 relative w-40 h-40 rounded-full overflow-hidden'
              }
            >
              <Image
                src={author?.author?.image?.sourceUrl}
                alt={author?.author?.image?.altText}
                fill={true}
                sizes={'240px'}
                className={'object-cover'}
              />
            </div>

            <div className={'col-span-3'}>
              <h5>{author.name}</h5>

              <p className={'text-sm underline mb-3'}>
                {author?.author?.position}
              </p>

              <HTMLContent className={'text-sm line-clamp-3 mb-5'}>
                {author?.description ?? ''}
              </HTMLContent>

              <h6 className={'mb-1.5'}>Credentials:</h6>

              {author?.author?.credentials?.map(({ credential }, index) => (
                <div
                  key={index}
                  className={'flex flex-row gap-1 items-center text-sm mb-1'}
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={'text-red-700'}
                  />

                  <p className={'text-sm'}>{credential}</p>
                </div>
              ))}

              <Link
                href={`/author/${author.slug}`}
                className={'text-red-600 hover:underline block mt-2'}
              >
                Read Full Bio
              </Link>
            </div>
          </div>

          <div className={'grid grid-cols-4 gap-4 px-8 py-4 bg-red-700'}>
            <div className={'col-span-1 flex flex-row justify-end'}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className={'text-white text-5xl font-thin'}
              />
            </div>

            <div className={'col-span-3 flex flex-col justify-center'}>
              <p className={'text-white text-sm'}>
                Want to read more about all our experts in the field?
              </p>
              <Link
                href={'/about-us/'}
                className={'text-white text-sm hover:underline'}
              >
                Learn About The Editorial Team
              </Link>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
