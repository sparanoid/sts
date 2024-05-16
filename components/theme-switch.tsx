'use client'

// https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch

import { useTheme } from 'next-themes'

import { Menu, MenuItem } from '@/components/ui/dropdown'

import { colorSchemes } from '@/lib/const'
import { IconCircleHalfStrokeSolidRotated } from './ui/icons'

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Menu
      label={
        <div>
          <IconCircleHalfStrokeSolidRotated className={'size-4 cursor-pointer fill-current'} />
        </div>
      }
    >
      {colorSchemes.map(scheme => {
        return (
          <MenuItem
            active={theme === scheme.name}
            key={scheme.name}
            label={scheme.desc}
            onClick={() => setTheme(scheme.name)}
          />
        )
      })}
    </Menu>
  )
}
