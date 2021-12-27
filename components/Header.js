import Image from "next/image";
function Header() {
    return (
        <header className="sticky top-0 z-[1000] flex items-center px-10 md:px-12 backdrop-blur-sm bg-gradient-to-b">
         <Image
        src="/images/logo.svg"
        alt=""
        width={80}
        height={80}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
      <div className=" ml-10 md:flex items-right space-x-10">
          <a className="header-link group">
            
            <span className="span">All Genre</span>
          </a>
          <a className="header-link group">
            
            <span className="span">Search</span>
          </a>
          <a className="header-link group">
            
            <span className="span">View Plans</span>
          </a>
          
           
        </div>
        </header>
    );
}

export default Header
