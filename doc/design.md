# Design

## Game States

```mermaid
graph TD;
    ChooseCharacter-->ChooseStage;
    ChooseStage-->PlayStage;
    PlayStage-->PauseGame;
    PauseGame-->PlayStage;
    PauseGame-->ChooseSettings;
    ChooseSettings-->PauseGame;
    PlayStage-->GameOver;
```
