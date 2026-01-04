import { getQueryParamAsString } from "@/utils/utilsFunction";
import {
  AlertColor,
  Box,
  Checkbox,
  Grid,
  ListProps,
  Typography,
} from "@mui/material";
import { del, get, post, put } from '@/utils/ApiConfig';
import React, { useEffect, useState } from "react";

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface listProps {
  open: boolean;
  permissionData: any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

const AdminPermission = ({
  permissionData,
  open,
  setAlertHandler,
}: listProps) => {
  const [Data, setData] = useState("");
  const uid = getQueryParamAsString("uid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>(
          `/group/getGroupByUserId/${uid}`,
          {},
          "instance1",
          setAlertHandler
        );
        const formattedData = data.data.map((data: any, key: number) => {
          return {
            id: key + 1,
            groupId: data.id,
            name: data.name,
            description: "Lorem ipsum dolor sit amet consectetur",
            status: "Active",
          };
        });
        setData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    if (uid !== undefined && uid != "") {
      fetchData();
    }
  }, [uid, open]);

  const [fullPermission, setFullPermission] = useState(false); // Full permission checkbox state
  const [plantPermission, setPlantPermission] = useState(false);
  const [usersPermission, setUsersPermission] = useState(false);
  const [groupsPermission, setGroupsPermission] = useState(false);
  const [rolesPermission, setRolesPermission] = useState(false);
  const [permissionSetsPermission, setPermissionSetsPermission] =
    useState(false);
  const [domainAdminPermission, setDomainAdminPermission] = useState(false);
  const [ssoSettingsPermission, setSsoSettingsPermission] = useState(false);
  const [securityPoliciesPermission, setSecurityPoliciesPermission] =
    useState(false);
  const [securityPemission, setSecurityPermission] = useState(false);
  const [emailPemission, setEmailPemission] = useState(false);
  const [SecurityPolicyPermission, setsecurityPolicyPermission] =
    useState(false);
  const [editOwnPlantDivisionPermission, setEditOwnPlantDivisonPermission] =
    useState(false);
  const [editAnyPlantDivisionPermission, setEditAnyPlantDivisonPermission] =
    useState(false);
  const [DeleteOwnPlantDivisionPermission, setDeleteOwnPlantDivisonPermission] =
    useState(false);
  const [DeleteAnyPlantDivisionPermission, setDeleteAnyPlantDivisonPermission] =
    useState(false);
  const [readAnyPlantDivisionPermission, setreadAnyPlantDivisonPermission] =
    useState(false);
  const [readOwnPlantDivisionPermission, setreadOwnPlantDivisonPermission] =
    useState(false);

  const [editOwnUsers, setEditOwnUsers] = useState(false);
  const [editAnyUsers, setEditAnyUsers] = useState(false);
  const [DeleteOwnUsers, setDeleteOwnUsers] = useState(false);
  const [DeleteAnyUsers, setDeleteAnyUsers] = useState(false);
  const [ReadOwnUsers, setReadOwnUsers] = useState(false);
  const [ReadAnyUsers, setReadAnyUsers] = useState(false);

  const [editOwnGroups, setEditOwnGroups] = useState(false);
  const [editAnyGroups, setEditAnyGroups] = useState(false);
  const [DeleteOwnGroups, setDeleteOwnGroups] = useState(false);
  const [DeleteAnyGroups, setDeleteAnyGroups] = useState(false);
  const [ReadOwnGroups, setReadOwnGroups] = useState(false);
  const [ReadAnyGroups, setReadAnyGroups] = useState(false);

  const [editOwnRoles, setEditOwnRoles] = useState(false);
  const [editAnyRoles, setEditAnyRoles] = useState(false);
  const [DeleteOwnRoles, setDeleteOwnRoles] = useState(false);
  const [DeleteAnyRoles, setDeleteAnyRoles] = useState(false);
  const [ReadOwnRoles, setReadOwnRoles] = useState(false);
  const [ReadAnyRoles, setReadAnyRoles] = useState(false);

  const [editOwnPermissionSet, setEditOwnPermissionSet] = useState(false);
  const [editAnyPermissionSet, setEditAnyPermissionSet] = useState(false);
  const [DeleteOwnPermissionSet, setDeleteOwnPermissionSet] = useState(false);
  const [DeleteAnyPermissionSet, setDeleteAnyPermissionSet] = useState(false);
  const [ReadOwnPermissionSet, setReadOwnPermissionSet] = useState(false);
  const [ReadAnyPermissionSet, setReadAnyPermissionSet] = useState(false);

  const [editOwnDomainAdministration, setEditOwnDomainAdministration] =
    useState(false);
  const [editAnyDomainAdministration, setEditAnyDomainAdministration] =
    useState(false);
  const [DeleteOwnDomainAdministration, setDeleteOwnDomainAdministration] =
    useState(false);
  const [DeleteAnyDomainAdministration, setDeleteAnyDomainAdministration] =
    useState(false);
  const [ReadOwnDomainAdministration, setReadOwnDomainAdministration] =
    useState(false);
  const [ReadAnyDomainAdministration, setReadAnyDomainAdministration] =
    useState(false);

  const [editOwnSsoSetting, setEditOwnSsoSetting] = useState(false);
  const [editAnySsoSetting, setEditAnySsoSetting] = useState(false);
  const [DeleteOwnSsoSetting, setDeleteOwnSsoSetting] = useState(false);
  const [DeleteAnySsoSetting, setDeleteAnySsoSetting] = useState(false);
  const [ReadOwnSsoSetting, setReadOwnSsoSetting] = useState(false);
  const [ReadAnySsoSetting, setReadAnySsoSetting] = useState(false);

  const [editOwnSecurityPolicies, setEditOwnSecurityPolicies] = useState(false);
  const [editAnySecurityPolicies, setEditAnySecurityPolicies] = useState(false);
  const [DeleteOwnSecurityPolicies, setDeleteOwnSecurityPolicies] =
    useState(false);
  const [DeleteAnySecurityPolicies, setDeleteAnySecurityPolicies] =
    useState(false);
  const [ReadOwnSecurityPolicies, setReadOwnSecurityPolicies] = useState(false);
  const [ReadAnySecurityPolicies, setReadAnySecurityPolicies] = useState(false);

  const [editOwnSecurity, setEditOwnSecurity] = useState(false);
  const [editAnySecurity, setEditAnySecurity] = useState(false);
  const [DeleteOwnSecurity, setDeleteOwnSecurity] = useState(false);
  const [DeleteAnySecurity, setDeleteAnySecurity] = useState(false);
  const [ReadOwnSecurity, setReadOwnSecurity] = useState(false);
  const [ReadAnySecurity, setReadAnySecurity] = useState(false);

  const [editOwnEmail, setEditOwnEmail] = useState(false);
  const [editAnyEmail, setEditAnyEmail] = useState(false);
  const [DeleteOwnEmail, setDeleteOwnEmail] = useState(false);
  const [DeleteAnyEmail, setDeleteAnyEmail] = useState(false);
  const [ReadOwnEmail, setReadOwnEmail] = useState(false);
  const [ReadAnyEmail, setReadAnyEmail] = useState(false);

  const [editOwnSecuritypolicie, setEditOwnSecuritypolicie] = useState(false);
  const [editAnySecuritypolicie, setEditAnySecuritypolicie] = useState(false);
  const [DeleteOwnSecuritypolicie, setDeleteOwnSecuritypolicie] =
    useState(false);
  const [DeleteAnySecuritypolicie, setDeleteAnySecuritypolicie] =
    useState(false);
  const [ReadOwnSecuritypolicie, setReadOwnSecuritypolicie] = useState(false);
  const [ReadAnySecuritypolicie, setReadAnySecuritypolicie] = useState(false);

  const handleFullPermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setFullPermission(isChecked);
    setPlantPermission(isChecked);
    setUsersPermission(isChecked);
    setGroupsPermission(isChecked);
    setRolesPermission(isChecked);
    setPermissionSetsPermission(isChecked);
    setDomainAdminPermission(isChecked);
    setSsoSettingsPermission(isChecked);
    setSecurityPoliciesPermission(isChecked);
    setSecurityPermission(isChecked);
    setEmailPemission(isChecked);
    setsecurityPolicyPermission(isChecked);

    setEditOwnPlantDivisonPermission(isChecked);
    setEditAnyPlantDivisonPermission(isChecked);
    setDeleteOwnPlantDivisonPermission(isChecked);
    setDeleteAnyPlantDivisonPermission(isChecked);
    setreadAnyPlantDivisonPermission(isChecked);
    setreadOwnPlantDivisonPermission(isChecked);

    setEditOwnUsers(isChecked);
    setEditAnyUsers(isChecked);
    setDeleteOwnUsers(isChecked);
    setDeleteAnyUsers(isChecked);
    setReadOwnUsers(isChecked);
    setReadAnyUsers(isChecked);

    setEditOwnGroups(isChecked);
    setEditAnyGroups(isChecked);
    setDeleteOwnGroups(isChecked);
    setDeleteAnyGroups(isChecked);
    setReadOwnGroups(isChecked);
    setReadAnyGroups(isChecked);

    setEditOwnRoles(isChecked);
    setEditAnyRoles(isChecked);
    setDeleteOwnRoles(isChecked);
    setDeleteAnyRoles(isChecked);
    setReadOwnRoles(isChecked);
    setReadAnyRoles(isChecked);

    setEditOwnPermissionSet(isChecked);
    setEditAnyPermissionSet(isChecked);
    setDeleteOwnPermissionSet(isChecked);
    setDeleteAnyPermissionSet(isChecked);
    setReadOwnPermissionSet(isChecked);
    setReadAnyPermissionSet(isChecked);

    setEditOwnDomainAdministration(isChecked);
    setEditAnyDomainAdministration(isChecked);
    setDeleteOwnDomainAdministration(isChecked);
    setDeleteAnyDomainAdministration(isChecked);
    setReadOwnDomainAdministration(isChecked);
    setReadAnyDomainAdministration(isChecked);

    setEditOwnSsoSetting(isChecked);
    setEditAnySsoSetting(isChecked);
    setDeleteOwnSsoSetting(isChecked);
    setDeleteAnySsoSetting(isChecked);
    setReadOwnSsoSetting(isChecked);
    setReadAnySsoSetting(isChecked);

    setEditOwnSecurityPolicies(isChecked);
    setEditAnySecurityPolicies(isChecked);
    setDeleteOwnSecurityPolicies(isChecked);
    setDeleteAnySecurityPolicies(isChecked);
    setReadOwnSecurityPolicies(isChecked);
    setReadAnySecurityPolicies(isChecked);

    setEditOwnSecurity(isChecked);
    setEditAnySecurity(isChecked);
    setDeleteOwnSecurity(isChecked);
    setDeleteAnySecurity(isChecked);
    setReadOwnSecurity(isChecked);
    setReadAnySecurity(isChecked);

    setEditOwnEmail(isChecked);
    setEditAnyEmail(isChecked);
    setDeleteOwnEmail(isChecked);
    setDeleteAnyEmail(isChecked);
    setReadOwnEmail(isChecked);
    setReadAnyEmail(isChecked);

    setEditOwnSecuritypolicie(isChecked);
    setEditAnySecuritypolicie(isChecked);
    setDeleteOwnSecuritypolicie(isChecked);
    setDeleteAnySecuritypolicie(isChecked);
    setReadOwnSecuritypolicie(isChecked);
    setReadAnySecuritypolicie(isChecked);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Typography
            variant="h4"
            color={"primary"}
            fontSize={16}
            borderBottom={"1px solid blue"}
            width={"fit-content"}
          >
            Configuration
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box display={"flex"}>
            <Checkbox
              checked={fullPermission}
              onChange={handleFullPermissionChange} // Handle full permission checkbox
            />
            <Typography mt={1.5} variant="h6">
              Full permission
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <div>
            <Typography variant="h4" fontSize={16} mt={5}>
              Plants/Departments
            </Typography>
            <Typography variant="h6" fontSize={14} mt={2} pl={2}>
              Plants/Departments
            </Typography>
          </div>
          <div>
            <Typography variant="h4" fontSize={16} mt={5}>
              Account & Privileges
            </Typography>
            <Typography variant="h6" fontSize={14} mt={2} pl={2}>
              Users
            </Typography>
            <Typography variant="h6" fontSize={14} mt={2} pl={2}>
              Groups
            </Typography>
            <Typography variant="h6" fontSize={14} mt={2} pl={2}>
              Roles
            </Typography>
            <Typography variant="h6" fontSize={14} mt={2} pl={2}>
              Permission sets
            </Typography>
          </div>
          <div>
            <Typography variant="h4" fontSize={16} mt={5}>
              Domain Administration
            </Typography>
            <Typography variant="h6" fontSize={14} mt={2} pl={2}>
              Domain Administration
            </Typography>
            <Typography variant="h6" fontSize={14} mt={2} pl={2}>
              SSO Settings
            </Typography>
            <Typography variant="h6" fontSize={14} mt={2} pl={2}>
              Security Policies
            </Typography>
          </div>
          <div>
            <Typography variant="h4" fontSize={16} mt={5}>
              Security
            </Typography>
            <Typography variant="h6" fontSize={14} mt={2} pl={2}>
              Security
            </Typography>
            <Typography variant="h6" fontSize={14} mt={2} pl={2}>
              Email
            </Typography>
            <Typography variant="h6" fontSize={14} mt={2} pl={2}>
              Security Policies
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={8} mt={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* "Create" Permission */}
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                fontSize={14}
                mt={1.5}
                fontWeight={"bold"}
              >
                Create
              </Typography>
            </Box>
            {/* "Edit Own" Permission */}
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                fontSize={14}
                mt={1.5}
                fontWeight={"bold"}
              >
                Edit Own
              </Typography>
            </Box>

            {/* "Edit Any" Permission */}
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                fontSize={14}
                mt={1.5}
                fontWeight={"bold"}
              >
                Edit Any
              </Typography>
            </Box>

            {/* "Delete Own" Permission */}
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                fontSize={14}
                mt={1.5}
                fontWeight={"bold"}
              >
                Delete Own
              </Typography>
            </Box>

            {/* "Delete Any" Permission */}
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                fontSize={14}
                mt={1.5}
                fontWeight={"bold"}
              >
                Delete Any
              </Typography>
            </Box>

            {/* "Read Own" Permission */}
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                fontSize={14}
                mt={1.5}
                fontWeight={"bold"}
              >
                Read Own
              </Typography>
            </Box>

            {/* "Read Any" Permission */}
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                fontSize={14}
                mt={1.5}
                fontWeight={"bold"}
              >
                Read Any
              </Typography>
            </Box>
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"auto auto auto auto auto auto auto"}
            gap={"6%"}
          >
            <div>
              <Box>
                <Box mt={3.6}>
                  <Checkbox
                    checked={plantPermission}
                    onChange={(e) => setPlantPermission(e.target.checked)}
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={7.3}>
                  <Checkbox
                    checked={usersPermission}
                    onChange={(e) => setUsersPermission(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={groupsPermission}
                    onChange={(e) => setGroupsPermission(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={rolesPermission}
                    onChange={(e) => setRolesPermission(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={permissionSetsPermission}
                    onChange={(e) =>
                      setPermissionSetsPermission(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={domainAdminPermission}
                    onChange={(e) => setDomainAdminPermission(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ssoSettingsPermission}
                    onChange={(e) => setSsoSettingsPermission(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={securityPoliciesPermission}
                    onChange={(e) =>
                      setSecurityPoliciesPermission(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={securityPemission}
                    onChange={(e) => setSecurityPermission(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={emailPemission}
                    onChange={(e) => setEmailPemission(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={SecurityPolicyPermission}
                    onChange={(e) =>
                      setsecurityPolicyPermission(e.target.checked)
                    }
                  />
                </Box>
              </Box>
            </div>
            <div>
              <Box>
                <Box mt={3.6}>
                  <Checkbox
                    checked={editOwnPlantDivisionPermission}
                    onChange={(e) =>
                      setEditOwnPlantDivisonPermission(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={7.3}>
                  <Checkbox
                    checked={editOwnUsers}
                    onChange={(e) => setEditOwnUsers(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editOwnGroups}
                    onChange={(e) => setEditOwnGroups(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editOwnRoles}
                    onChange={(e) => setEditOwnRoles(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editOwnPermissionSet}
                    onChange={(e) => setEditOwnPermissionSet(e.target.checked)}
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={editOwnDomainAdministration}
                    onChange={(e) =>
                      setEditOwnDomainAdministration(e.target.checked)
                    }
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editOwnSsoSetting}
                    onChange={(e) => setEditOwnSsoSetting(e.target.checked)}
                  />
                </Box>
                <Box mt={-1} display={"flex"} justifyContent={"space-between"}>
                  <Checkbox
                    checked={editOwnSecurityPolicies}
                    onChange={(e) =>
                      setEditOwnSecurityPolicies(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={editOwnSecurity}
                    onChange={(e) => setEditOwnSecurity(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editOwnEmail}
                    onChange={(e) => setEditOwnEmail(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editOwnSecuritypolicie}
                    onChange={(e) =>
                      setEditOwnSecuritypolicie(e.target.checked)
                    }
                  />
                </Box>
              </Box>
            </div>
            <div>
              <Box>
                <Box mt={3.6}>
                  <Checkbox
                    checked={editAnyPlantDivisionPermission}
                    onChange={(e) =>
                      setEditAnyPlantDivisonPermission(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={7.3}>
                  <Checkbox
                    checked={editAnyUsers}
                    onChange={(e) => setEditAnyUsers(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editAnyGroups}
                    onChange={(e) => setEditAnyGroups(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editAnyRoles}
                    onChange={(e) => setEditAnyRoles(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editAnyPermissionSet}
                    onChange={(e) => setEditAnyPermissionSet(e.target.checked)}
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={editAnyDomainAdministration}
                    onChange={(e) =>
                      setEditAnyDomainAdministration(e.target.checked)
                    }
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editAnySsoSetting}
                    onChange={(e) => setEditAnySsoSetting(e.target.checked)}
                  />
                </Box>
                <Box mt={-1} display={"flex"} justifyContent={"space-between"}>
                  <Checkbox
                    checked={editAnySecurityPolicies}
                    onChange={(e) =>
                      setEditAnySecurityPolicies(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={editAnySecurity}
                    onChange={(e) => setEditAnySecurity(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editAnyEmail}
                    onChange={(e) => setEditAnyEmail(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={editAnySecuritypolicie}
                    onChange={(e) =>
                      setEditAnySecuritypolicie(e.target.checked)
                    }
                  />
                </Box>
              </Box>
            </div>
            <div>
              <Box>
                <Box mt={3.6}>
                  <Checkbox
                    checked={DeleteOwnPlantDivisionPermission}
                    onChange={(e) =>
                      setDeleteOwnPlantDivisonPermission(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={7.3}>
                  <Checkbox
                    checked={DeleteOwnUsers}
                    onChange={(e) => setDeleteOwnUsers(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteOwnGroups}
                    onChange={(e) => setDeleteOwnGroups(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteOwnRoles}
                    onChange={(e) => setDeleteOwnRoles(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteOwnPermissionSet}
                    onChange={(e) =>
                      setDeleteOwnPermissionSet(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={DeleteOwnDomainAdministration}
                    onChange={(e) =>
                      setDeleteOwnDomainAdministration(e.target.checked)
                    }
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteOwnSsoSetting}
                    onChange={(e) => setDeleteOwnSsoSetting(e.target.checked)}
                  />
                </Box>
                <Box mt={-1} display={"flex"} justifyContent={"space-between"}>
                  <Checkbox
                    checked={DeleteOwnSecurityPolicies}
                    onChange={(e) =>
                      setDeleteOwnSecurityPolicies(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={DeleteOwnSecurity}
                    onChange={(e) => setDeleteOwnSecurity(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteOwnEmail}
                    onChange={(e) => setDeleteOwnEmail(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteOwnSecuritypolicie}
                    onChange={(e) =>
                      setDeleteOwnSecuritypolicie(e.target.checked)
                    }
                  />
                </Box>
              </Box>
            </div>
            <div>
              <Box>
                <Box mt={3.6}>
                  <Checkbox
                    checked={DeleteAnyPlantDivisionPermission}
                    onChange={(e) =>
                      setDeleteAnyPlantDivisonPermission(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={7.3}>
                  <Checkbox
                    checked={DeleteAnyUsers}
                    onChange={(e) => setDeleteAnyUsers(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteAnyGroups}
                    onChange={(e) => setDeleteAnyGroups(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteAnyRoles}
                    onChange={(e) => setDeleteAnyRoles(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteAnyPermissionSet}
                    onChange={(e) =>
                      setDeleteAnyPermissionSet(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={DeleteAnyDomainAdministration}
                    onChange={(e) =>
                      setDeleteAnyDomainAdministration(e.target.checked)
                    }
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteAnySsoSetting}
                    onChange={(e) => setDeleteAnySsoSetting(e.target.checked)}
                  />
                </Box>
                <Box mt={-1} display={"flex"} justifyContent={"space-between"}>
                  <Checkbox
                    checked={DeleteAnySecurityPolicies}
                    onChange={(e) =>
                      setDeleteAnySecurityPolicies(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={DeleteAnySecurity}
                    onChange={(e) => setDeleteAnySecurity(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteAnyEmail}
                    onChange={(e) => setDeleteAnyEmail(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={DeleteAnySecuritypolicie}
                    onChange={(e) =>
                      setDeleteAnySecuritypolicie(e.target.checked)
                    }
                  />
                </Box>
              </Box>
            </div>
            <div>
              <Box>
                <Box mt={3.6}>
                  <Checkbox
                    checked={readOwnPlantDivisionPermission}
                    onChange={(e) =>
                      setreadOwnPlantDivisonPermission(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={7.3}>
                  <Checkbox
                    checked={ReadOwnUsers}
                    onChange={(e) => setReadOwnUsers(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadOwnGroups}
                    onChange={(e) => setReadOwnGroups(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadOwnRoles}
                    onChange={(e) => setReadOwnRoles(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadOwnPermissionSet}
                    onChange={(e) => setReadOwnPermissionSet(e.target.checked)}
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={ReadOwnDomainAdministration}
                    onChange={(e) =>
                      setReadOwnDomainAdministration(e.target.checked)
                    }
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadOwnSsoSetting}
                    onChange={(e) => setReadOwnSsoSetting(e.target.checked)}
                  />
                </Box>
                <Box mt={-1} display={"flex"} justifyContent={"space-between"}>
                  <Checkbox
                    checked={ReadOwnSecurityPolicies}
                    onChange={(e) =>
                      setReadOwnSecurityPolicies(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={ReadOwnSecurity}
                    onChange={(e) => setReadOwnSecurity(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadOwnEmail}
                    onChange={(e) => setReadOwnEmail(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadOwnSecuritypolicie}
                    onChange={(e) =>
                      setReadOwnSecuritypolicie(e.target.checked)
                    }
                  />
                </Box>
              </Box>
            </div>
            <div>
              <Box>
                <Box mt={3.6}>
                  <Checkbox
                    checked={readAnyPlantDivisionPermission}
                    onChange={(e) =>
                      setreadAnyPlantDivisonPermission(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={7.3}>
                  <Checkbox
                    checked={ReadAnyUsers}
                    onChange={(e) => setReadAnyUsers(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadAnyGroups}
                    onChange={(e) => setReadAnyGroups(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadAnyRoles}
                    onChange={(e) => setReadAnyRoles(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadAnyPermissionSet}
                    onChange={(e) => setReadAnyPermissionSet(e.target.checked)}
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={ReadAnyDomainAdministration}
                    onChange={(e) =>
                      setReadAnyDomainAdministration(e.target.checked)
                    }
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadAnySsoSetting}
                    onChange={(e) => setReadAnySsoSetting(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadAnySecurityPolicies}
                    onChange={(e) =>
                      setReadAnySecurityPolicies(e.target.checked)
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Box mt={8}>
                  <Checkbox
                    checked={ReadAnySecurity}
                    onChange={(e) => setReadAnySecurity(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadAnyEmail}
                    onChange={(e) => setReadAnyEmail(e.target.checked)}
                  />
                </Box>
                <Box mt={-1}>
                  <Checkbox
                    checked={ReadAnySecuritypolicie}
                    onChange={(e) =>
                      setReadAnySecuritypolicie(e.target.checked)
                    }
                  />
                </Box>
              </Box>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPermission;
