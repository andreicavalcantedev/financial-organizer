import {useEffect, useRef, useState} from 'react';
import {Button} from '../ui/button';
import {MoreVertical} from 'lucide-react';
import {cn} from '@/lib/utils';

const DROPDOWN_ESTIMATED_HEIGHT = 80;

interface MenuActionsProps {
  options: {label: string; onClick: () => void}[];
}

const MenuActions = ({options}: MenuActionsProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [openAbove, setOpenAbove] = useState<boolean>(false);
  const menuRefActions = useRef<HTMLDivElement>(null);

  const handleToggleMenu = () => {
    if (!menuOpen) {
      const rect = menuRefActions.current?.getBoundingClientRect();
      const spaceBelow = rect
        ? window.innerHeight - rect.bottom
        : DROPDOWN_ESTIMATED_HEIGHT;
      setOpenAbove(spaceBelow < DROPDOWN_ESTIMATED_HEIGHT);
    }
    setMenuOpen(prev => !prev);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRefActions.current &&
        !menuRefActions.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  return (
    <div className="relative" ref={menuRefActions}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleToggleMenu}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
      {menuOpen && (
        <div
          role="menu"
          className={cn(
            'absolute right-0 z-10 min-w-[8rem] rounded-md border bg-white py-1 shadow-lg',
            openAbove ? 'bottom-full mb-1' : 'top-full mt-1',
          )}
        >
          {options.map(option => {
            return (
              <button
                key={option.label}
                type="button"
                role="menuitem"
                className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100"
                onClick={() => {
                  option.onClick();
                  setMenuOpen(false);
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuActions;
