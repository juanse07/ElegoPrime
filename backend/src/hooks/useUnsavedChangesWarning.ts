// import { useRouter } from "next/router";
// import nProgress from "nprogress";
// import { useEffect } from "react";
// export function useUnsavedChangesWarning (condition: boolean){
//     const router = useRouter();

//     useEffect(()=>{
//         const beforeunloadHandler = (event: BeforeUnloadEvent) => {
//             if(condition) {
//                 event.preventDefault();
//                 event.returnValue= true;
               
//             }
//         }
//         const routeCHANGEHandler = (url: string) => {
//             if(condition && !window.confirm("You have unsaved changes. Are you sure you want to leave?")){
//           nProgress.done();
//                 throw "routeChange aborted";
//             }
//         }
//         window.addEventListener("beforeunload", beforeunloadHandler);
//         router.events.on("routeChangeStart", routeCHANGEHandler);
//         return () => {
//             window.removeEventListener("beforeunload", beforeunloadHandler);
//             router.events.off("routeChangeStart", routeCHANGEHandler);

//         }
//    },[condition, router.events]);


    
   

// }