import { getCurrentYear, getFooterCopy } from '../utils/utils';
import newContext from '../Context/context';

function Footer() {
    return (
        <div className="App-footer mt-auto flex min-h-[55px] items-center justify-center border-t-[3px] border-[var(--main-color)] box-border">
            <p className="m-0 text-[10px] italic text-[#2d2d2d] max-[520px]:text-xs">
                Copyright {getCurrentYear()} - {getFooterCopy(true)}
            </p>

            <newContext.Consumer>
                {(context) => (
                    context.user.isLoggedIn && (
                        <p>
                            <a href="#contact">Contact us</a>
                        </p>
                    )
                )}
            </newContext.Consumer>
        </div>
    )
}

export default Footer;
