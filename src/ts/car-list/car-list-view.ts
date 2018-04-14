const drawCard = (data: object): string => {
    return `<section class="content__item">
              <img src="img/photos/_downloadfiles_wallpapers_1280_720_vw_golf_6_gti_wallpaper_volkswagen_cars_2129.jpg"
                 alt="photo" class="content__preview">
              <h3 class="content__title">Заголовок</h3>
              <div class="content__props">
                <span class="content__price">200 000</span>
                <span class="content__year">2012</span>
                <span class="content__mileage">150 000 км</span>
              </div>
            </section>`;
};
// TODO make car list view