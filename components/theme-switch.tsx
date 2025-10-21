'use client'

// https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch

import { IconBrightnessFilled } from '@tabler/icons-react'
import { useTheme } from 'next-themes'

import { colorSchemes } from '@/lib/const'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown'

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label='Change Theme' className='focus-ring rounded-full'>
        <IconBrightnessFilled className={'size-4 rotate-45 cursor-pointer fill-current'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {colorSchemes.map(scheme => {
            return (
              <DropdownMenuRadioItem key={scheme.name} value={scheme.name}>
                <span>{scheme.desc}</span>
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
