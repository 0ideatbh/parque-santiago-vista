
import Layout from '../components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-xl shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-realty-deep-blue/70 to-realty-royal-navy/70 z-10"></div>
          <div className="relative z-20 text-white text-center py-20 px-6">
            <h1 className="text-5xl font-playfair font-bold mb-4 text-realty-warm-sand">
              About Kristian
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-white/90 font-light">
              Your trusted partner in luxury Tenerife real estate
            </p>
          </div>
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
              alt="Luxury Real Estate" 
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-playfair font-bold text-realty-deep-blue">Our Story</h2>
            <p className="text-lg text-gray-700">
              With years of experience in the Tenerife luxury real estate market, Kristian has built 
              a reputation for excellence in property investment and management at Parque Santiago.
            </p>
            <p className="text-lg text-gray-700">
              Our commitment to exceptional service and deep understanding of the local market 
              makes us the preferred choice for discerning investors and property seekers.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-playfair font-bold text-realty-deep-blue">Our Expertise</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-realty-luxe-gold rounded-full mr-3"></span>
                Luxury property management
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-realty-luxe-gold rounded-full mr-3"></span>
                Investment opportunities
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-realty-luxe-gold rounded-full mr-3"></span>
                Local market expertise
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-realty-luxe-gold rounded-full mr-3"></span>
                Property renovation and upgrades
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-realty-warm-sand/20 rounded-xl p-8 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-realty-deep-blue mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Interested in learning more about our properties or investment opportunities? 
              We're here to help you make informed decisions about your real estate investments.
            </p>
            <button className="px-8 py-3 bg-realty-luxe-gold text-realty-deep-blue hover:bg-opacity-90 rounded-lg font-semibold transition-colors">
              Contact Kristian
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
