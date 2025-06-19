import styles from '../styles/homeService.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faSoap, faShower, faSink } from "@fortawesome/free-solid-svg-icons";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';


const HomeService = () => {
const servicesSectionRef = useScrollAnimation();
  return (
    <div className={styles.pageContainer}>
    <section ref={servicesSectionRef} className={`${styles.content} fade-in-section`}>
                <li className={styles.boxCustom}>
                <div className={styles.iconWrapper}>
                    <FontAwesomeIcon icon={faBed} className={styles.iconCustom} />
                </div>
                <div className={styles.textContent}>
                    <h4>Bedroom, living room and common areas</h4>
                    <p>
                    Dust all accessible surfaces<br/>
                    Wipe down all mirrors and glass fixtures<br/>
                    Clean all floor surfaces<br/>
                    Take out garbage and recycling
                    </p>
                </div>
                </li>
                <li className={styles.boxCustom}>
                <div className={styles.iconWrapper}>
                    <FontAwesomeIcon icon={faShower} className={styles.iconCustom} />
                </div>
                <div className={styles.textContent}>
                    <h4>Bathroom</h4>
                    <p>
                    Wash and sanitize the toilet, shower, tub, and sink<br/>
                    Dust all accessible surfaces<br/>
                    Wipe down all mirrors and glass fixtures<br/>
                    Clean all floor surfaces<br/>
                    Take out garbage and recycling
                    </p>
                </div>
                </li>
                <li className={styles.boxCustom}>
                <div className={styles.iconWrapper}>
                    <FontAwesomeIcon icon={faSink} className={styles.iconCustom} />
                </div>
                <div className={styles.textContent}>
                    <h4>Kitchen</h4>
                    <p>
                    Dust all accessible surfaces<br/>
                    Clean inside microwave<br/>
                    Wipe down exterior of stove, oven and fridge<br/>
                    Clean all floor surfaces<br/>
                    Take out garbage and recycling
                    </p>
                </div>
                </li>
                <li className={styles.boxCustom}>
                <div className={styles.iconWrapper}>
                    <FontAwesomeIcon icon={faSoap} className={styles.iconCustom} />
                </div>
                <div className={styles.textContent}>
                    <h4>Extras</h4>
                    <p>
                    Inside cabinets<br/>
                    Inside fridge<br/>
                    Inside oven<br/>
                    Laundry wash & fold<br/>
                    Interior windows
                    </p>
                </div>
                </li>
      </section>
    </div>
  );
};

export default HomeService;
