import {Component, setState} from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from  '../../components/Posts';
import { Button } from '../../components/Button';


export class Home extends Component{
    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postPerPage: 4,
      searchValue: ''
    };

    async componentDidMount(){
      this.loadPosts(); 
    }

    loadPosts = async () => {
      const {page, postPerPage} = this.state;

      const postsAndPhotos = await loadPosts();
      this.setState({
        posts: postsAndPhotos.slice(page, postPerPage), 
        allPosts: postsAndPhotos
      });
    }

    loadMorePosts = () => {
      const { 
        page, 
        postPerPage, 
        allPosts, 
        posts 
      } = this.state;
      const nextPage = page + postPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);

      posts.push(...nextPosts);

      this.setState({posts, page: nextPage})
    }
    handleChange = (e) => {
      const {value} = e.target;
      this.setState({ searchValue: value})
    }
    render(){
      const { posts, page, postPerPage, allPosts, searchValue } = this.state;
      const noMorePosts = page + postPerPage >= allPosts.length;

      const filteredPosts = !!searchValue ?
      
      //filtrando os posts
      allPosts.filter(post =>{
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      }) : posts;

      return(
        <section className="container">
          <>
          {!!searchValue && (
            <h1> valor: {searchValue} </h1>
          )}
          </>
         
          <input onChange={this.handleChange} value={searchValue} type="search" />
          <br /><br /><br />

          {filteredPosts.length > 0 && (
            <Posts posts={filteredPosts} />
          )}
          

          {filteredPosts.length === 0 && (
            <p>Desculpe mermao, mas o que esta procurano nao esta aqui...</p>
          )}

          <div className="button-container">
            {!searchValue && (
                <Button 
                text="Load More Posts"
                onClick={this.loadMorePosts}
                disabled={ noMorePosts }
                />
            )}
           </div>
        </section>
      );
    }
}
export default Home;
