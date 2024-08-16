import { useSelector } from "react-redux";

function RenderCode() {
  const { fullCode } = useSelector((state) => state.compiler);
  console.log(fullCode);

  const combineCode = `
    <html>
    <style>
    ${fullCode.css}
    </style>
    <body>
    ${fullCode.html}
    </body>
     <script>
    ${fullCode.javascript}
    </script>
    </html>
    `;

  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combineCode
  )}`;
  return (
    <div className=" bg-white h-[calc(100vh-60px)]">
      <iframe className=" h-full w-full" src={iframeCode} />
    </div>
  );
}

export default RenderCode;
