import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAulas } from "~/utils/aulas.server";
import { FaMapMarkedAlt, FaWhatsapp, FaClock } from "react-icons/fa";
import Aulas from "~/components/Aulas";

export const loader: LoaderFunction = async ({ request }) => {
  const TodasAulas = await getAulas();
  return json({ TodasAulas });
};

export default function Index() {
  const { TodasAulas } = useLoaderData();

  return (
    <div className="bg-stone-100 md:pt-4 h-screen ">
      <div className="container bg-white py-4 px-6 h-screen mx-auto rounded-lg ">
        <section className="mb-12 text-gray-800 lg:text-left">
          <div className="grid  lg:grid-cols-3 gap-6 xl:gap-12 items-center">
            <div className="mb-2 lg:mb-0 ">
              {/* <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold ">
                Quattor <br />
                <span className="text-blue-600">Academia</span>
              </h2> */}
              <div className="  ">
                <img
                  src="logo_alto.svg"
                  className="w-48 mx-auto md:mx-0 md:w-[240px] "
                  alt="logo"
                />
              </div>
            </div>
            <div className="mb-6 lg:mb-0">
              <div className="flex  items-baseline mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0">
                  <FaMapMarkedAlt />
                </div>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Onde Estamos
                </h2>
              </div>
              <div className="px-10 text-center  md:text-start  ">
                <p className="font-semibold text-lg  md:text-base">
                  Rua 5 Sul - Águas Claras - DF
                </p>
                <div className="">
                  <a
                    href="https://wa.me/5561993190568"
                    className="mt-2 text-xl font-semibold inline-flex items-center ">
                    <FaWhatsapp className="text-green-600 text-3xl  " />
                    (61) 99319-0568
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-baseline mb-3">
                <div className="w-8 h-8  mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                  <FaClock />
                </div>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Horário de Funcionamento
                </h2>
              </div>
              <div className="flex-grow px-10  font-medium text-center md:text-start ">
                <p className="leading-relaxed ">
                  <span className=" text-gray-900 ">Segunda a Sexta:</span> 6h
                  às 23h
                </p>
                <p className="leading-relaxed ">
                  <span className=" text-gray-900 ">Sábados e Feriados:</span>{" "}
                  8h às 12h
                </p>
                <p className="leading-relaxed  ">
                  <span className=" text-gray-900 ">Domingos:</span> 8h às 12h
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-3 md:grid-cols-5  gap-x-3 lg:gap-x-4">
          <div className="bg-white block rounded-lg shadow-lg -rotate-2">
            <div className="relative overflow-hidden bg-no-repeat bg-cover">
              <img
                src="/bale_foto.jpg"
                className=" object-cover h-36 w-80 md:h-52 md:w-full  rounded-lg"
                alt="fotos"
              />

              <svg
                className="absolute"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{ left: 0, bottom: -1 }}>
                <path
                  fill="#fff"
                  d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,213.3C672,203,768,213,864,202.7C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            <div className="p-2">
              <h5 className="text-lg font-bold text-orange-400 ">Ballet</h5>
              <p className="text-gray-500 mb-4">Infantil e Adulto </p>
            </div>
          </div>
          <div className="bg-white hidden md:block rounded-lg shadow-lg rotate-2">
            <div className="relative overflow-hidden bg-no-repeat bg-cover">
              <img
                src="/judo_foto_pb.jpg"
                className=" object-cover h-36 w-80 md:h-52 md:w-full rounded-lg"
                alt="fotos"
              />

              <svg
                className="absolute"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{ left: 0, bottom: -1 }}>
                <path
                  fill="#fff"
                  d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,213.3C672,203,768,117,864,85.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            <div className="p-2">
              <h5 className="text-lg  text-blue-500 font-bold ">Judô</h5>
              <p className="text-gray-500 mb-4">Infantil</p>
            </div>
          </div>

          <div className="bg-white hidden md:block  rounded-lg shadow-lg -rotate-2.5 ">
            <div className="relative overflow-hidden bg-no-repeat bg-cover">
              <img
                src="/muai_foto.jpg"
                className=" object-cover h-36 w-80 md:h-52 md:w-full rounded-lg"
                alt="fotos"
              />
              <a href="#!">
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"></div>
              </a>
              <svg
                className="absolute"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{ left: 0, bottom: -1 }}>
                <path
                  fill="#fff"
                  d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            <div className="p-2">
              <h5 className="text-lg  text-red-500 font-bold ">Muay thai</h5>
              <p className="text-gray-500 mb-4">Jovens e Adultos</p>
            </div>
          </div>

          <div className="bg-white  block  rounded-lg shadow-lg rotate-2">
            <div className="relative overflow-hidden bg-no-repeat bg-cover">
              <img
                src="/natacao_foto_pb.jpg"
                className=" object-cover h-36 w-80 md:h-52 md:w-full  rounded-lg"
                alt="fotos"
              />

              <svg
                className="absolute"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{ left: 0, bottom: -1 }}>
                <path
                  fill="#fff"
                  d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,213.3C672,203,768,117,864,85.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            <div className="p-2">
              <h5 className="text-lg  text-green-500 font-bold ">Natação</h5>
              <p className="text-gray-500 mb-4">Infantil</p>
            </div>
          </div>

          <div className="bg-white block  rounded-lg shadow-lg -rotate-2.5">
            <div className="relative overflow-hidden bg-no-repeat bg-cover">
              <img
                src="/musculacao_foto.jpg"
                className=" w-full rounded-t-lg object-cover h-36  md:h-52 md:w-full  rounded-lg"
                alt="fotos"
              />

              <svg
                className="absolute"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{ left: 0, bottom: -1 }}>
                <path
                  fill="#fff"
                  d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            <div className="p-2">
              <h5 className="text-lg  text-blue-500 font-bold ">Musculação</h5>
              <p className="text-gray-500 mb-4">Método Exclusivo</p>
            </div>
          </div>
        </div>

        <div className="overflow-auto rounded-lg mb-2 max-h-[500px] ">
          <Aulas aulas={TodasAulas} />
        </div>
      </div>
    </div>
  );
}
