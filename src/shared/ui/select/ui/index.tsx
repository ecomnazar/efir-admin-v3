import React from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Button } from '../../button';

interface Props {
  selected: { id: string; name: string };
  data: { id: string; name: string }[];
  hasNext: boolean;
  buttonLoading: boolean;
  onClickLoadMore: () => void;
  setSelected: React.Dispatch<React.SetStateAction<{
    name: string;
    id: string;
  }>>;
}

export const Select = ({ selected, setSelected, data, onClickLoadMore, hasNext, buttonLoading }: Props) => {
  return (
    // @ts-ignore
    <Listbox value={selected.name} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-md border-primary !bg-primary bg-transparent border py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
          <span className="block truncate">{selected.name}</span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md z-[999] bg-primary py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {data.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 text-center pr-4 ${active ? "bg-white text-primary" : "text-white"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? "font-medium" : "font-normal"
                        }`}
                    >
                      {item.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
            {hasNext && <Button title={'Load more'} loading={buttonLoading} onClick={onClickLoadMore} className='!bg-white/80 !text-primary mx-auto block' />}
            {/* <button>asd</button> */}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
