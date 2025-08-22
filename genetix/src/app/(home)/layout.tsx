interface Props {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <main className="flex flex-col min-h-screen bg-black overflow-x-hidden">
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </main>
    );
};

export default Layout;