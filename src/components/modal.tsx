interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    body: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disable: boolean;
}
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disable,
}) => {
    return (
        <>
            <div>
                <h1>Modal</h1>
            </div>
        </>
    );
}