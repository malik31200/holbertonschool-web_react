import logo from '../assets/holberton-logo.jpg';
import React from 'react';
import newContext from '../Context/context';

class Header extends React.Component {
    render () {
        return (
            <div className='App-header flex min-h-[110px] items-center border-b-[3px] border-[var(--main-color)] px-5 box-border max-[520px]:flex-col max-[520px]:justify-center max-[520px]:py-5'>
                <img src={logo} alt="holberton logo" className="w-[130px] h-auto" />
                <h1 className='ml-[25px] text-[28px] text-[var(--main-color)] max-[520px]:ml-0 max-[520px]:mt-2 max-[520px]:text-center max-[520px]:text-[24px]'>
                    School Dashboard
                </h1>

                {this.context.user.isLoggedIn && (
                    <p id='logoutSection'>
                        Welcome {this.context.user.email} (
                            <a href="#logOut" onClick={this.context.logOut}>
                                logout
                            </a>
                        )
                    </p>
                )}
            </div>
        );
    }
}

Header.contextType = newContext;

export default Header;
