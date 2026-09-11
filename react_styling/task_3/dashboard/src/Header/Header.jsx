import logo from '../assets/holberton-logo.jpg';

function Header() {
    return (
        <div className='App-header flex min-h-[110px] items-center border-b-[3px] border-[var(--main-color)] px-5 box-border'>
            <img src={logo} alt="holberton logo" />
            <h1 className='ml-[25px] text-[28px] text-[var(--main-color)]'>School Dashboard</h1>
        </div>
    );
}

export default Header;
