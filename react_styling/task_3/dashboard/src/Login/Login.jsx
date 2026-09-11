import WithLogging from '../HOC/WithLogging'; 
    
function Login() {
    return (
        <div className='App-login flex-1 box-border border-t-[3px] border-[var(--main-color)] p-5'>
            <p className="m-0 mb-5 text-[12px] text-[#2d2d2d]">Login to access the full dashboard</p>

            <form className="flex items-center">
                <label
                    htmlFor="email"
                    className="mr-[5px] text-[10px] text-[#2d2d2d]"
                    >
                        Email:
                    </label>

                <input
                    type="email"
                    id='email' 
                    className="mr-[5px] box-border h-[12px] w-[85px] border border-[#c8c8c8] px-[2px]"
                />

            
                <label
                    htmlFor="password"
                    className="mr-[5px] text-[10px] text-[#2d2d2d]"
                >
                    Password:
                </label>

                <input
                    type="password"
                    id='password'
                    className="mr-[5px] box-border h-[12px] w-[85px] border border-[#c8c8c8] px-[2px]"
                />
                <button
                    type="submit"
                    className="rounded-[2px] border border-[#c8c8c8] bg-[#eee] px-1 py-[1px] text-[8px] text-[#555]"
                >
                    OK
                </button>
            </form>
        </div>
    );
}

export default WithLogging(Login);