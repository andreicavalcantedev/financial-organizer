interface ModalContainerProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const ModalContainer = ({isOpen, children}: ModalContainerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center block">
      <div className="absolute inset-0 bg-black opacity-50 block" aria-hidden />
      {children}
    </div>
  );
};
