interface GenericModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    action: () => void;
}

export const AddNewTransactionModal = ({ title, description, isOpen, setIsOpen, action }: GenericModalProps) => {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)}></div>
            <div className="relative rounded-lg bg-white p-6 shadow-lg">
                <p className="mb-4 text-xl font-semibold">{title}</p>
                <p className="mb-6 text-sm text-gray-600">{description}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        onClick={() => {
                            action();
                            setIsOpen(false);
                        }}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )

}