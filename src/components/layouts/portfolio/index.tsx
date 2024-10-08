import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faChevronDown} from "@fortawesome/free-solid-svg-icons";

export default function Portfolio() {
  const [data, setData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("portofolio").select().order('id', { ascending: true });
      if (data) {
        setData(data);
      }
    };

    getData();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredData = selectedCategory === "All" ? data : data.filter((portfolio_data) => portfolio_data.category === selectedCategory);

  return (
    <article className="portfolio" data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="projects">
        <ul className="filter-list">
          <li className="filter-item">
            <button className={selectedCategory === "All" ? "active" : ""} onClick={() => handleCategoryChange("All")}>All</button>
          </li>
          <li className="filter-item">
            <button className={selectedCategory === "Design Branding" ? "active" : ""} onClick={() => handleCategoryChange("Design Branding")}>Design Branding</button>
          </li>
          <li className="filter-item">
            <button className={selectedCategory === "UX Design" ? "active" : ""} onClick={() => handleCategoryChange("UX Design")}>UX Design</button>
          </li>
          <li className="filter-item">
            <button className={selectedCategory === "Web development" ? "active" : ""} onClick={() => handleCategoryChange("Web development")}>Web development</button>
          </li>
        </ul>

        {/* dropdown */}

        <div className="filter-select-box">
            <button className="filter-select" data-select>
              <div className="select-value" data-selecct-value>Select category</div>
              <div className="select-icon">
                <FontAwesomeIcon icon={faChevronDown}/>
              </div>
            </button>
            <ul className="select-list">

              <li className="select-item">
                <button data-select-item className={selectedCategory === "All" ? "active" : ""} onClick={() => handleCategoryChange("All")}>All</button>
              </li>

              <li className="select-item">
                <button data-select-item className={selectedCategory === "Design Branding" ? "active" : ""} onClick={() => handleCategoryChange("Design Branding")}>Design Branding</button>
              </li>

              <li className="select-item">
                <button data-select-item className={selectedCategory === "UX Design" ? "active" : ""} onClick={() => handleCategoryChange("UX Design")}>UX Design</button>
              </li>

              <li className="select-item">
                <button data-select-item className={selectedCategory === "Web development" ? "active" : ""} onClick={() => handleCategoryChange("Web development")}>Web development</button>
              </li>
            </ul>

          </div>

        <ul className="project-list">
          {filteredData.map((portfolio_data, index) => (
            <li key={index} className="project-item active" data-filter-item data-category={portfolio_data.category}>
              <a href="#">
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <FontAwesomeIcon icon={faEye }/>
                  </div>
                  <img src={portfolio_data.image} alt={portfolio_data.title} loading="lazy"/>
                </figure>
                <h3 className="project-title">{portfolio_data.title}</h3>
                <p className="project-category">{portfolio_data.category}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
