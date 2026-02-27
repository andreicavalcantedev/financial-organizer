import {memo, useEffect, useRef, useState} from 'react';
import {MoreVertical} from 'lucide-react';
import {Button} from '../ui/button';
import {cn} from '@/lib/utils';

const DROPDOWN_ESTIMATED_HEIGHT = 80;

interface LatestTransactionsProps {
  title: string;
  transactionType: string;
  date?: string;
  amount: number;
  transactionId?: string;
  onDeleteClick: (transactionId: string) => void;
  onEditClick?: () => void;
}

export const LatestTransactions = memo(function LatestTransactions({
  title,
  transactionType,
  date,
  amount,
  transactionId,
  onDeleteClick,
  onEditClick,
}: LatestTransactionsProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [openAbove, setOpenAbove] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const hasActions = onDeleteClick !== undefined || onEditClick !== undefined;

  const handleToggleMenu = () => {
    if (!menuOpen) {
      const rect = menuRef.current?.getBoundingClientRect();
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
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  const isIncome = transactionType === 'income';
  const amountColor = isIncome ? 'text-emerald-600' : 'text-rose-600';
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount / 100);

  const displayAmount = isIncome
    ? `+ ${formattedAmount}`
    : `- ${formattedAmount}`;

  const handleDeleteClick = () => {
    setMenuOpen(false);
    if (transactionId) onDeleteClick(transactionId);
  };

  return (
    <li className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-slate-500">{date}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-medium ${amountColor}`}>
          {displayAmount}
        </span>
        {hasActions && (
          <div className="relative" ref={menuRef}>
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
                <button
                  type="button"
                  role="menuitem"
                  className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100"
                  onClick={handleDeleteClick}
                >
                  Deletar
                </button>
                <button
                  type="button"
                  role="menuitem"
                  disabled
                  aria-disabled
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm text-slate-400',
                    'cursor-not-allowed opacity-60',
                  )}
                >
                  Editar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
});
