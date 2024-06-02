import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";

function HeaderAdmin() {
    return (
        <div style={{ boxShadow: '0px 2px 2px -1px rgba(0, 0, 0, 0.15)' }} className='fixed left-[230px] w-[calc(100%-230px)] h-[52px] bg-white flex items-center justify-between px-[30px]'>
            {/* header left */}
            <div className='flex'>
                <div className='flex items-center bg-[white] border border-transparent rounded-[6px] w-[600px] hover:bg-[#F3F3F3] focus-within:border-[#0088FF] cursor-pointer group/input'>
                    <div className='w-[32px] h-[32px] flex items-center justify-center mx-[8px]'>
                        <IoIosSearch className='text-[#9CA3B5] text-[20px] ' />
                    </div>
                    <input className='h-[36px] text-[14px] rounded-[6px] bg-[white] outline-none w-full font-[500] group-hover/input:bg-[#F3F3F3] focus:border-[black]' placeholder='Tìm kiếm Crtl + K'></input>
                </div>
            </div>
            {/* header right */}
            <div className='flex items-center gap-2 max-w-[200px] h-[42px] rounded-[8px] cursor-pointer px-[8px] py-[5px] hover:bg-[#F2F9FF]'>
                <img className='w-[30px] h-[30px] rounded-full' src='https://lh3.googleusercontent.com/fife/ALs6j_GkUEHM-CoTp_QEIJtEmTMnIUv9SmC7-BkyYgU_PKObRNdklTQ2v8MHWD_2KzT2GAGRh4dt1tgZH3XIEBpIx4uf1OJEZVJ7ZENgWsBZT9KvIEoEbCUHTmhoAgToi5PEx8NVMZKEV3eF1LZsMidRrBeXpBCr_WxOxALNi61-CC2esKYxX0bCWM1bL8yINZIItOy-Y-bVSocmdyn1GDS1qVS4MNLpu_M0fihm8qC_u1iQxUvog_-eiFki0YHBHqySPojKb_BYcTNFt-4dhM7wMX6jdage7PCs_vffkP2H7GygwV9s-rvbbwSNmvueSWE1A0rO92wa7VxeX8sX5e_ZlHLUlpCTu0PeT8u_d3pGHUPtx17MVidrWHKIxDRUtC7mgy6rp-kwzTVsAZ1Os2o0UZ17i-m9kwwLZ_Y1wRmY7TCVpX58_SwtvTSAqyGtg5HZ66Oad4zwOpSklPIzINesLS20vomAmLSzkruIGbDulJGfIwa1DzIUuLmd9rq7xK1RXg3Jqxrp-hZEoYINMkWoB-FEksWj5fEWTAS_b-pzSjVcekxRN-JcPQ-9vrMu42Gav4QS77Ij5fPh2TeTFdKAodqw4yhRlqsRVmpDPBGTuGiFTQ0Ph5QCsVIzvnC9ABgndW2wDkDqNRmzPqlaWdt9QwyjlQQn3k-rwF2fuzeGlUYWVm3eWbA4i4bp1uLPUv9NH5L2eRQ2dGiliZQ3O7a5XI6diyV14BuLsXEw4mO0egUChp4QMF99Y5HkJ0NDzuLuK66EnulVj5mZ8XTIgMNcQAfnJuEAraszhQZfgRLd166N1jcT4m9-Mu6TsRKzwj5fqGMuXauwVT3BcjMxRk0AG5S-YC25_5bYO9QaMGxk1sZDkJsh1p6GxCUke4rwkSeHzNs-h9I5OJ_h2oAqDEmZ046IYxy1Q-WRsBZtG6Gmlsf5yOmdh4LbyEImMNeqgu2N9D2GKbWM7_LpBDv0mtn-K2TsNMA5e5irYnHKI5fvUNcpBx6cYM4ylHVaK65BRFhj-ou4DgzdWuedQWebJH9tx01DkD7Bb57DR-Rc6rlgRZ5MEgalndwHUcbkeVXb9diJayThN9YGsYO6J5aQ_DB4I1vpHJnDreXxM02z6uirE3HL-N45vzaGVCVAi3BTp11sZGu7pLvVZU3TQG6ye8jelv20quNwb7-g2UgRWN3TClGyJ1LSpbEI8w6yCqAXSergWbprzh06fqdUfkYWusMQW73_DZ7RZWS8r1djnSaBPzGKEw0D-Kt8C3y4HcIkSFBm07DV1okJWJpURl9JAtEtZiPO79GAMZsA8ZhO2sh6J-AcnIun7YhTGpOhUmvzKstLcYxxsyu3S5uTSIqjHif1fH094JrdfTuBJSdw50s4pC861OV7g9HIW6fuAul3YxYqnFzndbTpG_RimcSmoYKPQxoKAtIPgV1VgRmKua_TcIwpUWaxl1N41vMyMulDaNvdbJGo6zO2PQpZlrIE6KW2XBrfuvSyWQLAT-74e8vNZaP-O90FDujGVKh29Ry8DQk07aI9uUGXuP6ulAvmvxNSVWvTKXet0A5HRybpXhwEMUvY7mCmIbZkY651eflfrxdr1tWTreL4NyYe2lSoGA=s64-c' alt=''></img>
                <span className='flex-1 flex justify-center font-[500] text-[18px]'>Danh</span>
                <FaChevronDown className='text-[12px] mt-[1px] text-[#9CA3B5]'/>
            </div>
        </div>
    )
}

export default HeaderAdmin