const MainContainer = ({children} : {children: React.ReactNode}) => {
  return (
    <main className="container mx-auto py-2">
      {children}
    </main>
  );
};

export default MainContainer;