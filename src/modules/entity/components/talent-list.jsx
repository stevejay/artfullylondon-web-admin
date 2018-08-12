// @flow

import type { EventTalent } from "../flow-types";

import * as React from "react";
import empty from "empty";
import isEmpty from "lodash/isEmpty";
import { Table, TableBody, TableRow, TableCell, Text } from "grommet";
import ExtendedText from "shared/extended-text";
import ExtendedRoutedAnchor from "shared/scroll/extended-routed-anchor";
import Heading from "./times/heading";
import Section from "./times/section";
import { getTalentDisplayName } from "../utils/entity";

type Props = {
  +talents: ?Array<EventTalent>
};

const TalentList = ({ talents }: Props) => {
  if (isEmpty(talents)) {
    return null;
  }

  return (
    <Section>
      <Heading label="Talents" />
      <Table>
        <TableBody>
          {talents.map(talent => (
            <TableRow key={talent.id}>
              <TableCell verticalAlign="top">
                <Text>
                  <ExtendedRoutedAnchor path={"/" + talent.id}>
                    {getTalentDisplayName(
                      talent.talent.firstNames,
                      talent.talent.lastName
                    )}
                  </ExtendedRoutedAnchor>
                </Text>
              </TableCell>
              <TableCell verticalAlign="top">
                {!isEmpty(talent.roles) && (
                  <Text>{(talent.roles || empty.array).join(", ")}</Text>
                )}
                {!isEmpty(talent.characters) && (
                  <ExtendedText fontStyle="italic">
                    {(talent.characters || empty.array).join(", ")}
                  </ExtendedText>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
};

export default TalentList;
