import Footer from "@/components/Footer"
import Header from "@/components/Header"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <div className='pt-18 min-h-[50vh]'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default layout
