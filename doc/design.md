# Design

## Game States

```mermaid
graph TD;
    TitleScreen-->ChooseCharacter
    ChooseCharacter-->ChooseStage;
    ChooseStage-->PlayStage;
    PlayStage-->PauseGame;
    PauseGame-->PlayStage;
    PauseGame-->ChooseSettings;
    ChooseSettings-->PauseGame;
    PlayStage-->GameOver;
    GameOver-->TitleScreen;
```
