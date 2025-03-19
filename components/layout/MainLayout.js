function MainLayout({ children }) {
    try {
        const [isAssistantOpen, setIsAssistantOpen] = React.useState(false);
        
        const toggleAssistant = () => {
            setIsAssistantOpen(!isAssistantOpen);
        };
        
        return (
            <div data-name="main-layout" className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                    {children}
                </main>
                <Footer />
                
                {/* AI Assistant Button and Modal */}
                <AssistantButton onClick={toggleAssistant} />
                <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
            </div>
        );
    } catch (error) {
        console.error('MainLayout component error:', error);
        reportError(error);
        return null;
    }
}
