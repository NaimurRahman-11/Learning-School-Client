import { Bounce } from "react-awesome-reveal";


const Partner = ({ name, logoUrl }) => (
  <div className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
    <img src={logoUrl} alt={name} className="img-fluid partner-logo" />
  </div>
);

const OurPartners = () => {
  const partners = [
    {
      name: 'Fender',
      logoUrl: 'https://i.ibb.co/L9MsCdY/pngwing-com-11.png'
    },
    {
      name: 'Yamaha',
      logoUrl: 'https://i.ibb.co/Rv2Hd8N/pngwing-com-8.png'
    },
    {
      name: 'Roland',
      logoUrl: 'https://i.ibb.co/1mLP8js/pngwing-com-9.png'
    },
    {
      name: 'Korg',
      logoUrl: 'https://i.ibb.co/VMMnLQT/pngwing-com-10.png'
    },
    // Add more partners here
  ];

  return (
      <Bounce>
          <section className="section partners-section mt-5">
      <div className="container">
      <u> <h1 className="text-center p-5"><b>#Our Partners#</b></h1></u>
        <div className="row">
          {partners.map((partner, index) => (
            <Partner key={index} name={partner.name} logoUrl={partner.logoUrl} />
          ))}
        </div>
      </div>
      <style>{`
        .partner-logo {
          max-width: 100%;
          height: auto;
          max-height: 80px;
          margin-bottom: 20px;
        }
      `}</style>
    </section>
    </Bounce>
  );
};

export default OurPartners;
