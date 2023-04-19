import Home from "../component/Home"
import Navigation from "../component/Navigation"

const  UserLayout =({children})=>{
return (
<>
<div class="cotaniner" style={{display:"flex"}}>
<div style={{width:"30%",backgroundColor:"red"}}>
    <Navigation/>
</div>
<div style={{width:"70%",backgroundColor:"green"}}>
<Home/>

</div>
</div>
</>
)
}
export default UserLayout