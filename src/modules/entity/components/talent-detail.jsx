// @flow

import type { TalentForEdit } from "../flow-types";

import * as React from "react";
import { pure } from "recompose";
import { History, StatusUnknown, Group } from "grommet-icons";
import * as entityType from "shared/types/entity-type";
import RestoreScroll from "shared/scroll/restore-scroll";
import Column from "shared/column";
import Header from "./header";
import Description from "./description";
import Notes from "./notes";
import Aside from "./aside";
import IconLinkList from "./icon-link-list";
import { getTalentDisplayName, getEnumDisplayValue } from "../utils/entity";

type Props = {
  +talent: TalentForEdit,
  +onEdit: void => void
};

const TalentDetail = ({ talent, onEdit }: Props) => (
  <React.Fragment>
    <RestoreScroll />
    <Header
      entityType={entityType.TALENT}
      id={talent.id}
      name={getTalentDisplayName(talent.firstNames, talent.lastName)}
      subTitle={talent.commonRole}
      images={talent.images}
      onEdit={onEdit}
    />
    <Column.Container>
      <Column basis="2/3">
        <Description
          description={talent.description}
          descriptionCredit={talent.descriptionCredit}
          weSay={talent.weSay}
        />
        <Notes notes={talent.notes} />
      </Column>
      <Column basis="1/3">
        <Aside.Container>
          <Aside icon={History} title="Version">
            Version {talent.version}
          </Aside>
          <Aside icon={StatusUnknown} title="Status">
            {getEnumDisplayValue(talent.status)}
          </Aside>
          <Aside icon={Group} title="Talent Type">
            {getEnumDisplayValue(talent.talentType)}
          </Aside>
        </Aside.Container>
        <IconLinkList links={talent.links} entityType={entityType.TALENT} />
      </Column>
    </Column.Container>
  </React.Fragment>
);

export default pure(TalentDetail);
