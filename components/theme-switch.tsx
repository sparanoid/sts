'use client'

// https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch

import { useTheme } from 'next-themes'

import { Menu, MenuItem } from '@/components/ui/dropdown'
import { IconCircleHalfStrokeSolidRotated } from '@/components/ui/icons'

import { colorSchemes } from '@/lib/const'

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Menu
      label={<IconCircleHalfStrokeSolidRotated className={'size-4 cursor-pointer fill-current'} />}
      aria-label='Change Theme'
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
