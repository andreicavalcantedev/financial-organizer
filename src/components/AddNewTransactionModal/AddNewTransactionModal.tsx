import { Button } from "../ui/button";

interface AddNewTransactionProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    action: () => void;
}

export const AddNewTransactionModal = ({ isOpen, setIsOpen, action }: AddNewTransactionProps) => {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative rounded-lg bg-white p-6 shadow-lg">
                <p className="mb-4 text-xl font-semibold">Titulo</p>
                <p className="mb-6 text-sm text-gray-600">descrição</p>
                <div className="flex justify-end space-x-4">
                    <Button variant="destructive" onClick={() => setIsOpen(false)}>Cancelar</Button>
                    <Button disabled variant="outline" onClick={() => {
                        action();
                        setIsOpen(false);
                        }}
                    >
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    )

}