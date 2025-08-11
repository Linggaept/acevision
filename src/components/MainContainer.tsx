const MainContainer = ({children} : {children: React.ReactNode}) => {
  return (
    <main className="container mx-auto py-8 md:py-2 w-11/12 md:w-full">
      {children}
    </main>
  );
};

export default MainContainer;