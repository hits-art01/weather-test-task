// "use client";

// import React from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReduxProvider } from "@/store/ReduxProvider";

// // создаём один экземпляр QueryClient вне компонента
// const queryClient = new QueryClient();

// interface ClientProviderWrapperProps {
//   children: React.ReactNode;
// }

// const ClientProviderWrapper = ({ children }: ClientProviderWrapperProps) => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReduxProvider>
//         {children}
//       </ReduxProvider>
//     </QueryClientProvider>
//   );
// };

// export default ClientProviderWrapper;
