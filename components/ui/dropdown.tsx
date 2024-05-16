'use client'

// https://floating-ui.com/docs/react-examples#other
// https://codesandbox.io/s/admiring-lamport-5wt3yg
import * as React from 'react'
import clsx from 'clsx'

import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  useListNavigation,
  useHover,
  // useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  useFloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useMergeRefs,
  FloatingNode,
  FloatingTree,
  FloatingFocusManager,
} from '@floating-ui/react'

import css from './dropdown.module.css'

interface MenuItemProps {
  label: React.ReactNode | string
  disabled?: boolean
  showIndicator?: boolean
  active?: boolean
  /**
   * When `true`, make the item itself zero padding. Useful for `a` links inside the item
   */
  customAction?: boolean
}

// eslint-disable-next-line react/display-name
const MenuItem = React.forwardRef<
  HTMLButtonElement,
  MenuItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ label, disabled, showIndicator, active, customAction, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      role='menuitem'
      className={clsx(
        props.className,
        showIndicator && css.showIndicator,
        active && css.active,
        customAction && css.customAction
      )}
      disabled={disabled}
    >
      {label}
    </button>
  )
})

interface MenuProps {
  label: any
  nested?: boolean
  children?: React.ReactNode
}
const MenuComponent = React.forwardRef<
  HTMLButtonElement,
  MenuProps & React.HTMLProps<HTMLButtonElement>
>(({ children, label, ...props }, forwardedRef) => {
  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const [allowHover, setAllowHover] = React.useState(false)

  const listItemsRef = React.useRef<Array<HTMLButtonElement | null>>([])
  const listContentRef = React.useRef(
    React.Children.map(children, child =>
      React.isValidElement(child) ? child.props.label : null
    ) as Array<string | null>
  )

  const tree = useFloatingTree()
  const nodeId = useFloatingNodeId()
  const parentId = useFloatingParentNodeId()
  const nested = parentId != null

  const { x, y, strategy, refs, context } = useFloating<HTMLButtonElement>({
    open,
    nodeId,
    onOpenChange: setOpen,
    placement: nested ? 'right-start' : 'bottom-start',
    middleware: [
      offset({ mainAxis: 5, alignmentAxis: nested ? -4 : 0 }),
      flip(),
      shift({
        padding: 10,
      }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
          })
        },
        padding: 10,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useHover(context, {
      handleClose: safePolygon({
        blockPointerEvents: true,
      }),
      enabled: nested && allowHover,
      delay: { open: 75 },
    }),
    useClick(context, {
      toggle: !nested || !allowHover,
      event: 'mousedown',
      ignoreMouse: nested,
    }),
    useRole(context, { role: 'menu' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      nested,
      onNavigate: setActiveIndex,
    }),
    // https://github.com/floating-ui/floating-ui/issues/2126#issuecomment-1384533672
    // useTypeahead(context, {
    //   listRef: listContentRef,
    //   onMatch: open ? setActiveIndex : undefined,
    //   activeIndex
    // })
  ])

  // Event emitter allows you to communicate across tree components.
  // This effect closes all menus when an item gets clicked anywhere
  // in the tree.
  React.useEffect(() => {
    function handleTreeClick() {
      setOpen(false)
    }

    function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setOpen(false)
      }
    }

    tree?.events.on('click', handleTreeClick)
    tree?.events.on('menuopen', onSubMenuOpen)

    return () => {
      tree?.events.off('click', handleTreeClick)
      tree?.events.off('menuopen', onSubMenuOpen)
    }
  }, [tree, nodeId, parentId])

  React.useEffect(() => {
    if (open) {
      tree?.events.emit('menuopen', {
        parentId,
        nodeId,
      })
    }
  }, [tree, open, nodeId, parentId])

  // Determine if "hover" logic can run based on the modality of input. This
  // prevents unwanted focus synchronization as menus open and close with
  // keyboard navigation and the cursor is resting on the menu.
  React.useEffect(() => {
    function onPointerMove({ pointerType }: PointerEvent) {
      if (pointerType !== 'touch') {
        setAllowHover(true)
      }
    }

    function onKeyDown() {
      setAllowHover(false)
    }

    window.addEventListener('pointermove', onPointerMove, {
      once: true,
      capture: true,
    })
    window.addEventListener('keydown', onKeyDown, true)
    return () => {
      window.removeEventListener('pointermove', onPointerMove, {
        capture: true,
      })
      window.removeEventListener('keydown', onKeyDown, true)
    }
  }, [allowHover])

  const referenceRef = useMergeRefs([refs.setReference, forwardedRef])

  return (
    <FloatingNode id={nodeId}>
      <span
        ref={referenceRef}
        data-open={open ? '' : undefined}
        {...getReferenceProps({
          ...props,
          className: clsx(nested ? css.ItemWrap : css.Root, open && css.open),
          onClick(event) {
            event.stopPropagation()
          },
          ...(nested && {
            // Indicates this is a nested <Menu /> acting as a <MenuItem />.
            role: 'menuitem',
          }),
        })}
      >
        {label}{' '}
        {nested && (
          <span aria-hidden className='ml-2'>
            ›
          </span>
        )}
      </span>
      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            // Prevent outside content interference.
            modal={!nested}
            // Only initially focus the root floating menu.
            initialFocus={nested ? -1 : 0}
            // Only return focus to the root menu's reference when menus close.
            returnFocus={!nested}
            // Allow touch screen readers to escape the modal root menu
            // without selecting anything.
            visuallyHiddenDismiss
          >
            <div
              ref={refs.setFloating}
              className={`${css.Menu} floating`}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                // width: "max-content"
              }}
              {...getFloatingProps({
                // Pressing tab dismisses the menu due to the modal
                // focus management on the root menu.
                onKeyDown(event) {
                  if (event.key === 'Tab') {
                    setOpen(false)

                    if (event.shiftKey) {
                      event.preventDefault()
                    }
                  }
                },
              })}
            >
              {React.Children.map(
                children,
                (child, index) =>
                  React.isValidElement(child) &&
                  React.cloneElement(
                    child,
                    getItemProps({
                      tabIndex: activeIndex === index ? 0 : -1,
                      role: 'menuitem',
                      className: css.ItemWrap,
                      ref(node: HTMLButtonElement) {
                        listItemsRef.current[index] = node
                      },
                      onClick(event) {
                        child.props.onClick?.(event)
                        tree?.events.emit('click')
                      },
                      // Allow focus synchronization if the cursor did not move.
                      onMouseEnter() {
                        if (allowHover && open) {
                          setActiveIndex(index)
                        }
                      },
                    })
                  )
              )}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </FloatingNode>
  )
})

const Menu = React.forwardRef<HTMLButtonElement, MenuProps & React.HTMLProps<HTMLButtonElement>>(
  (props, ref) => {
    const parentId = useFloatingParentNodeId()

    if (parentId == null) {
      return (
        <FloatingTree>
          <MenuComponent {...props} ref={ref} />
        </FloatingTree>
      )
    }

    return <MenuComponent {...props} ref={ref} />
  }
)

MenuItem.displayName = 'MenuItem'
MenuComponent.displayName = 'MenuComponent'
Menu.displayName = 'Menu'

export { MenuItem, MenuComponent, Menu }
