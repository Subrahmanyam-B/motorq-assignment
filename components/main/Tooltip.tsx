const Tooltip = ({ children, tooltip } : any) => {
   return (
     <div className="group relative">
       {children}
       <span className="invisible text-xs group-hover:visible opacity-0 group-hover:opacity-100 transition duration-700 bg-white text-slate-600 p-1 rounded absolute left-full whitespace-nowrap">
         {tooltip}
       </span>
     </div>
   );
 };
 
 export default Tooltip;