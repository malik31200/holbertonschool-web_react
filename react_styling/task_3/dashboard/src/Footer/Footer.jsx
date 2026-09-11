import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
    return (
        <div className="App-footer mt-auto flex min-h-[55px] items-center justify-center border-t-[3px] border-[var(--main-color)] box-border">
            <p className="m-0 text-[10px] italic text-[#2d2d2d]">
                Copyright {getCurrentYear()} - {getFooterCopy(true)}
            </p>
        </div>
    )
}

export default Footer;
