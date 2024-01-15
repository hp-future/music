import styles from './style.module.scss';
import ContentWrapper from 'src/components/ContentWrapper';
import Banner from './components/banner';
import PlayList from './components/playList';
import MV from './components/mv';

/**
 * 个性推荐
 */
export default function Personalized() {
  return (
    <div className={styles.PersonalizedClassName}>
      <ContentWrapper>
        <Banner />
        <PlayList />
        <MV />
      </ContentWrapper>
    </div>
  );
}
