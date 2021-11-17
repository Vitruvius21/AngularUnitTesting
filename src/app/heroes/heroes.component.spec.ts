import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful" },
      { id: 3, name: "SuperDude", strength: 24 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    component = new HeroesComponent(mockHeroService);
  });

  describe("delete", () => {
    it("should remove the indicated hero from the heroes list", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes).toEqual([HEROES[0], HEROES[1]]);
    });

    it("should call deleteHero", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });

  describe("ngOnInit", () => {
    it("should call getHeroes", () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));

      component.ngOnInit();

      expect(mockHeroService.getHeroes).toHaveBeenCalled();
    });

    it("should assign getHeroes Response Data to component.heroes", () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));

      component.ngOnInit();
      mockHeroService.getHeroes().subscribe((heroes) => {
        component.heroes = heroes;
      });

      expect(component.heroes).toEqual(HEROES);
    });
  });
});
